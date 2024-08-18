const ProductPreview = ({product, isLeftSided}) => {
    const cardClassname = isLeftSided
        ? "flex flex-col rounded-xl rounded-tr-[35px] items-center pt-2 space-y-4 bg-white shadow-md"
        : "flex flex-col rounded-xl rounded-tl-[35px] items-center pt-2 space-y-4 bg-white shadow-md"
    return <div className={cardClassname}>
        <h3 className="text-sm font-medium">{product.brand}</h3>
        <img src={`/src/assets${product.image}`} alt={product.name} className="h-28"/>
        <div className="flex items-center justify-between w-full">
            <div>
                <p className="text-lg font-bold pt-3 ml-2">$-.-</p>
            </div>
            <div>
                <a href={`/product/${product.id}-${product.brand.replace(' ', '-').toLowerCase()}`}
                    className="rounded-tl-xl rounded-br-xl bg-orange-400 pt-2 pb-3 pl-3 pr-3 text-white">
                    +
                </a>
            </div>
        </div>
    </div>;
}

export default ProductPreview;