import Layout from "../components/layout";
import ControlledCarousel from "../components/carousel"
import BookSelectionLoggedIn from "../components/myBooks";
import AllBooks from "../components/books";
import AddBooks from "../components/addBooks";




const Browse = () => {
    

    return (
        <>
    

    <Layout></Layout>
    <ControlledCarousel></ControlledCarousel>
    
    <AllBooks></AllBooks>
    <AddBooks></AddBooks>
    
    
    </>
    
    

)
}

export default Browse;