import React from 'react'
import { Breadcrumb, BreadcrumbItem, Container } from 'reactstrap'
import "./singleheader.css"
import { Link } from 'react-router-dom'

export default function SingleHeader(props) {
    const { title } = props
    return (

        <Container fluid className=" page-header ">
            <h1 className="text-center text-white ">{title}</h1>
            <Breadcrumb listClassName='justify-content-center'>
                <BreadcrumbItem ><Link href="#">Trang chủ</Link></BreadcrumbItem>
                <BreadcrumbItem active className="text-white">{title}</BreadcrumbItem>
            </Breadcrumb>
        </Container>

    )
}