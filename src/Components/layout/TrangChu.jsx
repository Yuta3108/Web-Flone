import React from 'react'
import Header from '../layout/Header'
import Menu from '../layout/Menu'
import DMSP from '../layout//DMSP'
import Banner from '../layout/Banner'
import List from '../CacChucNang/List'
import Footer from '../layout//Footer'
import Newsdata from '../CacChucNang/Newsdata'
function Trangchu()
{
    return(
        <div>
        <Header/>
        <Menu/>
        <div style={{margin: '10px'}}/>
        <DMSP/>
        <Banner/>
        <List />
        <Newsdata/>
        <Footer/>
        </div>
    )
}
export default Trangchu