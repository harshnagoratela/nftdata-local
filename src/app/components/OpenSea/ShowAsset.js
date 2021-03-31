import React from 'react'
import moment from 'moment'
import { Heading, Text, Card, Box, Image, Link } from 'rimble-ui';

const ShowAsset = (props) => {
    const { asset } = props;
    const { openseaLink } = asset;
    const name = asset.name || asset.assetContract.name || "No Name";
    const description = asset.description || asset.assetContract.description;
    const imageUrl = asset.imagePreviewUrl || asset.assetContract.imageUrl;
    // const ts = listingTime.toNumber() * 1000
    // const timeLabel = moment(ts).local().fromNow()
    return (
        <Box width={1 / 3}>
            <Card>
                <Link href={openseaLink} target="_blank"><Heading as={'h4'}>{name}</Heading></Link>
                <Image
                    src={imageUrl}
                    alt={name}
                    borderRadius={8}
                />
                <Text>
                    {description}
                </Text>
            </Card>
        </Box>
    );
}

export default ShowAsset;