import {productRoute} from "../main.jsx";
import useProducts from "../hooks/useProducts.js";
import {useEffect, useState} from "react";
import useSku from "../hooks/useSku.js";

export const Product = () => {
    const {compositeId} = productRoute.useParams();
    const productId = compositeId?.split('-')[0];

    const [selectedSkuId, setSelectedSkuId] = useState();
    const [informationExpanded, setInformationExpanded] = useState(false);

    const {data: products} = useProducts();
    const {data: sku} = useSku(selectedSkuId);
    const product = products?.find(p => p.id == productId)

    useEffect(() => {
        setSelectedSkuId(product?.skus[0]?.code)
    }, [products])

    const isInformationLong = product?.information.length > 200
    const information = informationExpanded || !isInformationLong
        ? product?.information
        : product?.information.substring(0, 200) + '...';
    return (
        <>
            <div className="flex flex-col p-4 pt-8 ">
                <header className="flex items-center justify-between p-2 pb-10">
                    <a href="/"
                       className="bg-transparent h-12 w-12 rounded-xl flex items-center justify-between pl-3 shadow">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="5" y="11" width="15" height="1.5" fill="#323232"/>
                            <path d="M11 5.20001L4 11.7L11 18.2" stroke="#323232" strokeWidth="1.5"
                                  strokeLinecap="round"/>
                        </svg>

                    </a>
                    <h3 className="text-xl">Detail</h3>
                    <button
                        className="bg-transparent h-12 w-12 rounded-xl p-2 shadow">
                        <svg width="30" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="5.5" cy="11.5" r="1.5" fill="#323232"/>
                            <circle cx="12.5" cy="11.5" r="1.5" fill="#323232"/>
                            <circle cx="19.5" cy="11.5" r="1.5" fill="#323232"/>
                        </svg>

                    </button>
                </header>
            </div>
            <main className="flex flex-col p-0 m-0">
                <img className="h-64 object-contain" src={`/src/assets${product?.image}`}/>
                <div className="h-screen bg-gray-50 rounded-t-[50px]">
                    <div className="flex items-center justify-between pt-2 mt-7">
                        <h3 className="text-2xl ml-4">
                            {product?.brand}
                        </h3>
                        <h3 className="text-2xl mr-5 text-orange-400">
                            ${sku?.price / 100}
                        </h3>
                    </div>
                    <div className="flex font-thin justify-between text-sm text-gray-400 p-1 ml-3">
                        Origin: {product?.origin} | Stock: {sku?.stock}
                    </div>
                    <div className="flex justify-between p-1 mt-3 ml-3">
                        Description
                    </div>
                    <p className="text-sm text-gray-400 p-1 ml-3 font-thin">
                        {information} {!informationExpanded && isInformationLong &&
                        <a onClick={() => setInformationExpanded(true)} className="text-orange-300">Read More</a>}
                    </p>
                    <div className="flex justify-between p-1 mt-3 ml-3">
                        Size
                    </div>
                    <div className="grid gap-3 items-center justify-between grid-cols-3 pr-2 pl-4">
                        {product?.skus.map(sku => {
                            const isSelected = sku.code === selectedSkuId;
                            const className = isSelected
                                ? "flex border-[1px] font-thin rounded-full pl-2 text-sm text-orange-300 border-orange-300"
                                : "flex border-[1px] font-thin rounded-full pl-2 text-sm text-gray-400 border-gray-300";
                            return <div key={sku.code} onClick={() => setSelectedSkuId(sku.code)} className={className}>
                                <label className="pr-4 truncate">
                                    {sku.name}
                                </label>
                            </div>
                        })}
                    </div>
                    <div className="flex justify-between p-1 mt-10 ml-3">
                        <button
                            className="flex border-[1px] font-thin rounded-xl p-4 text-sm text-orange-400 border-orange-300">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="6" r="4.25" stroke="#FF9F24" strokeWidth="1.5"/>
                                <path
                                    d="M4.30623 9.59689C4.50953 7.97049 5.89208 6.75 7.53113 6.75H16.4689C18.1079 6.75 19.4905 7.97049 19.6938 9.59689L20.6938 17.5969C20.9362 19.5367 19.4237 21.25 17.4689 21.25H6.53113C4.57626 21.25 3.06375 19.5367 3.30623 17.5969L4.30623 9.59689Z"
                                    fill="white" stroke="#FF9F24" strokeWidth="1.5"/>
                                <circle cx="9.75" cy="10.75" r="0.75" fill="#FF9F24"/>
                                <circle cx="13.75" cy="10.75" r="0.75" fill="#FF9F24"/>
                            </svg>
                        </button>
                        <button
                            onClick={() => alert(`Add to cart item with sku: ${selectedSkuId}`)}
                            className="flex bg-orange-400 rounded-xl px-24 mx-2 pt-4 text-md text-white">
                            Add to cart
                        </button>
                    </div>
                </div>
            </main>
        </>
    )
}
