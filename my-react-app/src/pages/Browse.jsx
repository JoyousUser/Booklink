import Layout from "/wamp64/www/Booklink/my-react-app/src/components/layout";
import ControlledCarousel from "../components/carousel"
import BookSelectionLoggedIn from "../components/myBooks";
import AllBooks from "../components/books";
import AddBooks from "../components/addBooks";




const Browse = () => {
    

    return (
        <>
    

    <Layout></Layout>
    <ControlledCarousel></ControlledCarousel>
    <BookSelectionLoggedIn></BookSelectionLoggedIn>
    <AllBooks></AllBooks>
    <AddBooks></AddBooks>
    
    
    </>
    
    

)
}

export default Browse;