import { useLoaderData } from "react-router-dom";
import SliderItems from "../../Components/SliderItems/SliderItems";
import Banner from "../../Components/Banner/Banner";
import TopSales from "../../Components/TopSales/TopSales";


const Home = () => {
    const items = useLoaderData()
    // console.log(items)

    const topSixItems = items.sort((a, b) => b.purchaseCount - a.purchaseCount).slice(0, 6)
    // console.log(topSixItems)
    return (
        <>
            <Banner></Banner>
            {/* 
            <TopSales
                topSixItems={topSixItems}
            ></TopSales> */}

            <div className="mt-10 container mx-auto" >
                <h1 className="text-4xl font-bold text-center">Top Sales</h1>
                <div className="mt-6 gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" >
                    {
                        topSixItems.map((item) =>
                            <TopSales
                                key={item._id}
                                item={item}
                            ></TopSales>
                        )
                    }
                </div>
            </div>

            <SliderItems
                data={items}
            ></SliderItems>
        </>

    );
};

export default Home;