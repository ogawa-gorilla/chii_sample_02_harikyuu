import React from 'react'
import { Button, Image, Table } from 'react-bootstrap'

interface AttachedImagesTableProps {
    images: string[]
    onImageClick: (imageUrl: string) => void
    onDeleteImage: (imageUrl: string) => void
}

const AttachedImagesTable: React.FC<AttachedImagesTableProps> = ({
    images,
    onImageClick,
    onDeleteImage,
}) => {
    if (images.length === 0) {
        return null
    }

    return (
        <div className="mt-3">
            <strong>添付画像:</strong>
            <Table responsive className="mt-2">
                <thead>
                    <tr>
                        <th>サムネイル</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {images.map((imageUrl, index) => (
                        <tr key={index}>
                            <td style={{ width: '200px' }}>
                                <Image
                                    src={imageUrl}
                                    thumbnail
                                    fluid
                                    style={{
                                        cursor: 'pointer',
                                        maxWidth: '150px',
                                        height: 'auto',
                                    }}
                                    onClick={() => onImageClick(imageUrl)}
                                />
                            </td>
                            <td
                                style={{
                                    width: '100px',
                                    verticalAlign: 'middle',
                                }}
                            >
                                <Button
                                    variant="outline-danger"
                                    size="sm"
                                    onClick={() => onDeleteImage(imageUrl)}
                                >
                                    削除
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default AttachedImagesTable
