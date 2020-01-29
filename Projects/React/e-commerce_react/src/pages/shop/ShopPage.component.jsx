import React, { Component } from 'react'
import './shop-page.style.scss'
import SHOP_DATA from './shop_data'
import { CollectionPreview } from '../../components/collection_preview/CollectionPreview.component'


export class ShopPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            collections: SHOP_DATA
        }
    }
    

    render() {
        const {collections} = this.state;
        return (
            <div className="shop-page">
                {
                    collections.map(({id,...otherProps})=>(
                        <CollectionPreview key={id} {...otherProps}/>
                    ))
                }
            </div>
        )
    }
}

export default ShopPage

