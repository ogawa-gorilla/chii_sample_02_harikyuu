import { useState } from 'react'

export const useImageModal = () => {
    const [showImageModal, setShowImageModal] = useState(false)
    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(
        null
    )

    const handleImageClick = (imageUrl: string) => {
        setSelectedImageUrl(imageUrl)
        setShowImageModal(true)
    }

    const handleCloseImageModal = () => {
        setShowImageModal(false)
        setSelectedImageUrl(null)
    }

    return {
        showImageModal,
        selectedImageUrl,
        handleImageClick,
        handleCloseImageModal,
    }
}
