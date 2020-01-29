import React from 'react'
import './collection-item.style.scss'

export const CollectionItem = ({imageUrl,name,price}) => {
    return (
        <div className="collection_item">
            <div
                className="collection_item-image"
                style={{
                    backgroundImage: `url(${imageUrl})`
                }}
            />
            <div className="collection_item-footer">
                <span className="name">{name}</span>
                <span className="price">{price}</span>
            </div>
        </div>
    )
}
