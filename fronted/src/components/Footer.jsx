import { Avatar, Footer } from "flowbite-react";
import main_img from '../assets/main_img.png';

const FooterCom = () => {
  return (
    <>
      <Footer container className="border-t-8 border-green-500">
        <div className="w-full text-center">
            <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
                <Avatar className="cursor-pointer" img={main_img} alt="main_image" rounded size={"md"} bordered color="gray"/>

                <Footer.LinkGroup>
                    <Footer.Link href="#">About</Footer.Link>
                    <Footer.Link href="#">Privacy Policy</Footer.Link>
                    <Footer.Link href="#">Licensing</Footer.Link>
                    <Footer.Link href="#">Contact</Footer.Link>
                </Footer.LinkGroup>
            </div>
            <Footer.Divider/>
            <Footer.Copyright href="#" by="waste_wizard" year={new Date().getFullYear()}/>
        </div>
      </Footer>
    </>
  )
}

export default FooterCom
