import React from 'react'
import './collection-item.style.scss'
import { CustomButton } from '../custom_button/CustomButton.component'
import { addItem } from '../../redux/cart/cart.action'
import { connect } from 'react-redux'

const CollectionItem = ({item,addItem}) => {
    const {imageUrl,name,price} = item;

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
            <CustomButton onClick={()=>addItem(item)} inverted>Add to cart</CustomButton>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
})

export default connect(null,mapDispatchToProps)(CollectionItem);