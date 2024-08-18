import ProductPreview from "../components/ProductPreview.jsx";
import useProducts from "../hooks/useProducts.js";

export const Products = () => {
    const {data: products, isLoading} = useProducts();
    return (
        <div className="flex flex-col p-4 pt-8 bg-gray-50">
            <header className="flex items-center justify-between p-2 pb-10">
                <button
                    onClick={() => alert("Clicked on nav, not implemented")}
                    className="bg-transparent h-12 w-12 rounded-xl p-2 shadow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="5" width="16" height="1.5" rx="0.75" fill="#0F0D23"/>
                        <rect x="4" y="11" width="10" height="1.5" rx="0.75" fill="#0F0D23"/>
                        <rect x="4" y="17" width="16" height="1.5" rx="0.75" fill="#0F0D23"/>
                    </svg>

                </button>
                <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                        <img
                            src={'/src/assets/profile.jpg'}
                            alt="User Avatar" className="w-full h-full object-cover"/>
                    </div>
                </div>
            </header>
            <main className="flex flex-col h-screen p-1 space-y-4">
                <div className="space-y-1">
                    <p className="text-sm text-gray-500">Hi Mr. Michael,</p>
                    <h1 className="text-2xl">Welcome Back!</h1>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Our Products</h2>
                    <div className="grid gap-4 mt-4 grid-cols-2">
                        {products && products.map((product, index) => (
                            <ProductPreview key={product.id} product={product} isLeftSided={index % 2 === 0}/>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    )
}
