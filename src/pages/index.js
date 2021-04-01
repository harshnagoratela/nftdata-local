// Frameworks
import React from 'react';
import { Heading, Button, Text, Box, Link, Loader, Image, Table } from 'rimble-ui';
import styled from 'styled-components';

// Layout Components
import Layout from '../components/layout';
import SEO from '../components/seo';

const TableCellHeading = styled.th`
  padding: 1rem !important;
`
const TableCell = styled.td`
  padding: 1rem !important;
`

const IndexPage = () => {

    const [loaded, setLoaded] = React.useState(false);
    const [collections, setCollections] = React.useState([]);

    React.useEffect(() => {
        //get collections
        const fetch = require('node-fetch');
        const url = 'https://api.opensea.io/api/v1/collections';
        const options = { method: 'GET', qs: { offset: '0', limit: '300'} };
        fetch(url, options)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                setLoaded(true)
                setCollections(json.collections)
            })
            .catch(err => console.error('error:' + err));
    }, []);

    return (
        <Layout>
            <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
            <Box mt={4}>
                <Text.p style={{ float: "right" }}>
                    <Button size="small" as="a" href="/app/">Ethereum Dapp</Button>
                </Text.p>
            </Box>
            <Heading as={"h2"}>
                Viewing Recent Collections
            </Heading>
            <Table mt={4}>
                <thead>
                    <tr>
                        <TableCellHeading>SrNo</TableCellHeading>
                        <TableCellHeading>Name</TableCellHeading>
                        <TableCellHeading>Image</TableCellHeading>
                        <TableCellHeading>Total Volume</TableCellHeading>
                        <TableCellHeading>Total Supply</TableCellHeading>
                        <TableCellHeading>Total Sale</TableCellHeading>
                    </tr>
                </thead>
                <tbody>
                    {!loaded && <tr><TableCell><Loader style={{ display: "inline-flex" }} />Loading Collections...</TableCell></tr>}
                    {collections && collections.map((collection, index) => (
                        <tr key={index}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell><Link href={`/collection/${collection.slug}`}>{collection.name}</Link></TableCell>
                            <TableCell><Image src={collection.image_url} alt={collection.name} borderRadius={8} width={80} /></TableCell>
                            <TableCell>{collection.stats.total_volume}</TableCell>
                            <TableCell>{collection.stats.total_supply}</TableCell>
                            <TableCell>{collection.stats.total_sales}</TableCell>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Layout>
    );
};

export default IndexPage;
