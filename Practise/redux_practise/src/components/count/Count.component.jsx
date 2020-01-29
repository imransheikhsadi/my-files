import React from 'react'
import { connect } from 'react-redux'
import {sub,add} from '../../redux/count/count.actions'

function CountComp({count,add,sub}) {
    return (
        <div>
            <h1>This is the great counter of the world</h1>
            <h2>{count}</h2>
            <button onClick={sub}>SUB -</button>
            <button onClick={add}>ADD +</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        ...state.count
    }
}

const mapDispatchToProps= (dispatch)=>{
    return {
        add: ()=> dispatch(add()),
        sub: ()=> dispatch(sub())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CountComp);