// Frameworks
import React from 'react';
import { navigate } from 'gatsby';
import { Heading, Button, Text, Box, Flex, Card, Modal, Link, Loader, Image, Table } from 'rimble-ui';
import styled from 'styled-components';
import _ from 'lodash'

// Layout Components
import Layout from '../components/layout';
import SEO from '../components/seo';
import RecentSales from '../components/OpenSea/RecentSales'
import RecentListings from '../components/OpenSea/RecentListings'

import Wallet from '../app/wallets';
import { RootStoreContext } from '../app/stores/root.store';

const TableCellHeading = styled.th`
  padding: 1rem !important;
`
const TableCell = styled.td`
  padding: 1rem !important;
`

const IndexPage = () => {

    const rootStore = React.useContext(RootStoreContext);
    const isLoggedIn = rootStore.walletStore.hasAccount;

    const [isOpen, setIsOpen] = React.useState(false);

    const closeModal = e => {
        e.preventDefault();
        setIsOpen(false);
    };

    const openModal = e => {
        e.preventDefault();
        setIsOpen(true);
    };

    const wallet = Wallet.instance();
    const _walletConnect = (walletType) => async () => {
        try {
            // console.log("***** login clicked")            
            await wallet.init(walletType);
            await wallet.connect();
            setIsOpen(false);
            //navigate(`/`);
        }
        catch (err) {
            console.error(err);
        }
    };
    const _logout = async () => {
        await wallet.disconnect();
        navigate(`/`);
    };

    const walletButtons = _.map(Wallet.typeMap(), (walletData, walletType) => {
        const disabled = !Wallet.isEnabled(walletType);
        return (
            <Box key={walletType} m={2}>
                <Button size="small" onClick={_walletConnect(walletType)} disabled={disabled}>{walletData.name}</Button>
            </Box>
        );
    });

    return (
        <Layout>
            <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
            <Box mt={4}>
                <Text.p style={{ float: "right" }}>
                    {!isLoggedIn &&
                        <Button size="small" onClick={openModal}>Login</Button>
                    }
                    {isLoggedIn &&
                        <Button size="small" onClick={_logout}>Logout</Button>
                    }
                </Text.p>
            </Box>
            <Heading as={"h2"}>
                Manage My Assets
            </Heading>
            <Flex flexWrap='wrap'>
                <Card>
                    <Link href="#" target="_blank"><Heading as={'h4'}>Title</Heading></Link>
                    <Image src="https://via.placeholder.com/150" borderRadius={8} />
                    <Text>Description</Text>
                </Card>
                <Card>
                    <Link href="#" target="_blank"><Heading as={'h4'}>Title</Heading></Link>
                    <Image src="https://via.placeholder.com/150" borderRadius={8} />
                    <Text>Description</Text>
                </Card>
                <Card>
                    <Link href="#" target="_blank"><Heading as={'h4'}>Title</Heading></Link>
                    <Image src="https://via.placeholder.com/150" borderRadius={8} />
                    <Text>Description</Text>
                </Card>
            </Flex>
            <Flex mt={3}>
                <RecentSales />
                <RecentListings />
            </Flex>

            <Modal isOpen={isOpen}>
                <Card width={"420px"} p={0}>
                    <Button.Text
                        icononly
                        icon={"Close"}
                        color={"moon-gray"}
                        position={"absolute"}
                        top={0}
                        right={0}
                        mt={3}
                        mr={3}
                        onClick={closeModal}
                    />

                    <Box p={4} mb={3}>
                        <Heading.h3>Choose Login Option</Heading.h3>
                        <Flex flexWrap='wrap'>{walletButtons}</Flex>
                    </Box>

                    <Flex
                        px={4}
                        py={3}
                        borderTop={1}
                        borderColor={"#E8E8E8"}
                        justifyContent={"flex-end"}
                    >
                        <Button.Outline size='small' onClick={closeModal}>Close</Button.Outline>
                    </Flex>
                </Card>
            </Modal>
            {/* <Box mt={4}>
                <Text.p style={{ float: "right" }}>
                    {walletButtons}
                    {!isLoggedIn &&
                        <Button size="small" as="a" href="/app/">Login</Button>
                    }
                    {isLoggedIn &&
                        <Button size="small" onClick={_logout}>Logout</Button>
                    }
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
                            <TableCell>{index + 1}</TableCell>
                            <TableCell><Link href={`/collection/${collection.slug}`}>{collection.name}</Link></TableCell>
                            <TableCell><Image src={collection.image_url} alt={collection.name} borderRadius={8} width={80} /></TableCell>
                            <TableCell>{collection.stats.total_volume}</TableCell>
                            <TableCell>{collection.stats.total_supply}</TableCell>
                            <TableCell>{collection.stats.total_sales}</TableCell>
                        </tr>
                    ))}
                </tbody>
            </Table> */}
        </Layout>
    );
};

export default IndexPage;
