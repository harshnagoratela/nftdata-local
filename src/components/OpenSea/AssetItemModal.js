import React from 'react';
import { Heading, Button, Text, Box, Flex, Card, Link, Loader, Image } from 'rimble-ui';
import { Modal, ModalManager, Effect } from 'react-dynamic-modal'

const AssetItemModal = (props) => {
    const { item, onRequestClose } = props;
    const imageURL = item.asset && (item.asset.image_thumbnail_url || item.asset.image_preview_url || item.asset.image_url)
    const name = item.asset && (item.asset.name || 'No Title')
    const description = item.asset && item.asset.description
    const assetLink = item.asset && (item.asset.permalink || '#')
    const collectionName = item.asset && item.asset.collection && item.asset.collection.name
    const collectionLink = item.asset && item.asset.collection && item.asset.collection.slug
    const price = (item.total_price || 0) / 1000000000000000000;
    const sellername = item.seller && item.seller.user && item.seller.user.username
    return (
        <Modal onRequestClose={onRequestClose} effect={Effect.ScaleUp}>
            <Card p={0}>
                <Button.Text
                    icononly
                    icon={"Close"}
                    color={"moon-gray"}
                    position={"absolute"}
                    top={0}
                    right={0}
                    mt={3}
                    mr={3}
                    onClick={ModalManager.close}
                />

                <Box p={4} mb={3}>
                    <Heading.h3>{name}</Heading.h3>
                    <Flex mt={3}>
                        <Box>
                            <Image src={imageURL} alt={name} width={80} borderRadius={8} />
                        </Box>
                        <Box px={3}>
                            <Text>{description}</Text>
                            {collectionName &&
                                <Link href={`http://opensea.io/collection/${collectionLink}`} target="_blank"><Text>{collectionName}</Text></Link>
                            }
                            <Text>Price: {price} ETH</Text>
                            {sellername &&
                                <Text>Sold by: {sellername}</Text>
                            }
                        </Box>
                    </Flex>                    
                </Box>

                <Flex
                    px={4}
                    py={3}
                    borderTop={1}
                    borderColor={"#E8E8E8"}
                    justifyContent={"flex-end"}
                >
                    <Button size='small' onClick={ModalManager.close}>Close</Button>
                </Flex>
            </Card>
        </Modal>
    )
}

export default AssetItemModal;