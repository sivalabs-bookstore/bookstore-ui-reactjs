import React, {useEffect, useState} from 'react';
import {RouteComponentProps, useLocation} from 'react-router-dom';
import {ProductListModel} from "../models/Models";
import * as api from "../services/api";
import ProductList from "../components/ProductList";

interface ProductsProps extends RouteComponentProps<any> {

}

const Products: React.FC<ProductsProps> = (props: ProductsProps): JSX.Element => {
    const initialData = {
        data: [],
        pageNumber: 1,
        totalPages: 1,
        hasNext: false,
        hasPrevious: false
    };
    const search = useLocation().search;
    const [products, setProducts] = useState<ProductListModel>(initialData);

    const fetchProducts = (pageNumber: number) => {
        api.fetchProducts(pageNumber)
            .then(response => {
                setProducts(response.data)
            })
            .catch(e => console.log("error", e));
    }

    useEffect(() => {
        const pageVal = new URLSearchParams(search).get("page");
        let page = parseInt(pageVal as string) || 1;
        fetchProducts(page)
    }, [search]);

    return (
        <div className="row">
            <div className="col-md-8 offset-2">
                <ProductList {...products} basePath={'/products'}/>
            </div>

        </div>
    );
}

export default Products;
