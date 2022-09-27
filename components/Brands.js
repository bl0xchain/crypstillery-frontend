const Brands = () => {
    return (
        <div className="py-8 px-6 w-full bg-black">
            <h2 className="mb-4 text-3xl font-bold text-center text-white">
                Popular Brands
            </h2>
            <div className="grid grid-cols-4 gap-10 items-center">
                <div>
                    <img src="https://cdn.blockbar.com/media/uploads/brand/Brand/4654d7f8-29ba-446d-a0c9-a2640c5370ff/1800-logo/776f862dc3da14e4a6cb3838d786bfcc.webp" className="object-contain hover:object-scale-down" />
                </div>
                <div>
                    <img src="https://cdn.blockbar.com/media/uploads/brand/Brand/fb562c88-d3c0-4877-b2c0-5d3d1a002b19/logo-ardbeg/d9dbda0815882f5afc81c2a04419352b.webp" className="object-contain hover:object-scale-down" />
                </div>
                <div>
                    <img src="https://cdn.blockbar.com/media/uploads/brand/Brand/c1ce37fa-40db-40b6-80e2-b77733e22430/Dictador-colombian-aged-rum_2/3fc533ac8cf40706aa2559e108a2b8d8.webp" className="object-contain hover:object-scale-down" />
                </div>
                <div>
                    <img src="https://cdn.blockbar.com/media/uploads/brand/Brand/312bc7a7-f32b-45a5-9912-06f75d5cf7d2/GF_CRYSTALLINE_STAG_WORDMARK_A_CLEAR_cl/6c830a33f47ff8251a967e80881cd2c5.webp" className="object-contain hover:scale-110 transition ease-in-out delay-150" />
                </div>
                <div>09</div>
            </div>
        </div>
    )
}

export default Brands;