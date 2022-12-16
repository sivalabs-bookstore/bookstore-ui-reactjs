import React from "react";
import Product from "./Product";
import Pagination from "./Pagination";
import {ProductListModel} from "../models/Models";

const ProductList: React.FC<ProductListModel> = (bookmarks: ProductListModel): JSX.Element => {
    //console.log("ProductList:", bookmarks);

    return (
        <div className={"container"}>
            {bookmarks.data.length === 0 &&
                <div className={"container"}>
                    <h3>No products found</h3>
                </div>
            }
            {bookmarks.totalPages > 1 && <Pagination {...bookmarks}/>}
            <div className="row row-cols-1 row-cols-md-4">
                {bookmarks.data.map(p => {
                    return (
                        <Product key={p.id}  {...p} />
                    );
                })}
            </div>
            {bookmarks.totalPages > 1 && <Pagination {...bookmarks}/>}
        </div>
    );
}

export default ProductList;
