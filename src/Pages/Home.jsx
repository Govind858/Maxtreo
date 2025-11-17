import NavBar from "../components/user/NavBar/NavBar";
// import Product from '../components/user/Products/ProductsList';
import Footer from "../components/user/Footer/Footer";
// import OffersSection from "../components/user/OfferSection";
// import FeaturedProductList from "../components/Admin/FeaturedProduct/FeaturedProduct";
// import ProductBanner from "../components/user/ProductsBanner/ProductBanner";
import HeroCarousel from "../components/user/HeroCarousel/HeroCarousel";
import ProductHighlights from "../components/user/Products/ProductHighlights";

function Home() {
  return (
    <div>
      <NavBar />
      {/* <OffersSection/> */}
      <HeroCarousel/>
      <ProductHighlights/>
      {/* <ProductBanner/> */}
      {/* <Product/> */}
      <Footer/>
    </div>
  );
}

export default Home;
