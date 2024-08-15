import React from 'react'
import  Nav from "../../component/Navbar/Nav" 
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='page-404 '>
      <Nav/>
      <div className='NotFound d-flex w-100 justify-content-center'>
        <div className=''>
<div className='not-found-img d-flex'> 
<img src={require('../../image/page-404.png')}></img>
</div>
<div className='not-found-text'>
<h1>Page Not Found</h1>
<p class="font-lg text-grey-700 mb-30">
                            The link you clicked may be broken or the page may have been removed.<br/>
                            visit the <Link to={"/"}><span> Homepage</span></Link>   about the problem
                        </p>
</div>

            </div>

        <div>
        </div>
      </div>
    </div>
  )
}

export default NotFound