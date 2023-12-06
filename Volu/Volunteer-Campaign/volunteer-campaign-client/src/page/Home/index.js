import Slider from "./Slider";
import Introduce from "./Introduce";
import Campaign from "./Campaign";
import Donate from "./Donate";
import Donor from "./Donor";
import RegisterVolunteer from "./RegisterVolunteer";
import News from "./News";


function Home() {
    return (<>
        <Slider />
        <Introduce />
        <Campaign />
        <Donate />
        <Donor />
        <RegisterVolunteer />
        <News />
    </>);
}

export default Home;
