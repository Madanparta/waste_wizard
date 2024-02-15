import { Modal,Avatar  } from "flowbite-react";
import main_image from '../assets/main_img.png';
import { useDispatch, useSelector } from "react-redux";
import { aboutToggle } from "../redux/about/aboutSlice";

const AboutComponent = () => {
    const dispatch = useDispatch()
    const aboutGet = useSelector(state=>state.about.about)
  return (
    <>
      <Modal show={aboutGet} onClose={()=>dispatch(aboutToggle(false))}>
        <Modal.Header>
            <div className="flex flex-wrap items-center gap-3 text-gray-600">
                <Avatar img={main_image} alt="main_image" rounded size={"lg"} bordered color="blueToGreen"/>
                Waste Wizard
            </div>
        </Modal.Header>
        <Modal.Body>
            <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">Wastewizard project is to pusblish an efficient and sustainable solution for the proper handling and getting rid of wastes.</p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">It aims to minimize environmental impact by reducing waste generation, promoting recycling, and ensuring safe and responsible disposal of non-recyclable waste.</p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">The project strives to optimize the entire waste management process, from colection to final disposal, to reduce pollution,  conserve resources, and imporve public health.</p>
            </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AboutComponent
