import { useNavigate } from 'react-router-dom';

import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-slate-900 text-gray-300 mt-10 px-2">
      <div className="max-w-[1240px] mx-auto flex gap-7 border-b-2 border-gray-600 py-8">
        <div className="min-w-[8rem]">
          <h6 className="font-bold uppercase pt-2">Products</h6>
          <ul>
            <li onClick={() => navigate('/products?category=1')} className="py-1 hover:brightness-110 transition cursor-pointer">
              Pharmaceutical Intermediate
            </li>
            <li onClick={() => navigate('/products?category=2')} className="py-1 hover:brightness-110 transition cursor-pointer">
              Pharmaceutical Chemical
            </li>
            <li onClick={() => navigate('/products?category=3')} className="py-1 hover:brightness-110 transition cursor-pointer">
              Biochemical
            </li>
            {/* <li className='py-1'>Cloud</li> */}
          </ul>
        </div>
        <div className="min-w-[8rem]">
          <h6 className="font-bold uppercase pt-2">Support</h6>
          <ul>
            <li className="py-1 hover:brightness-110 transition cursor-pointer">Contact Us</li>
            <li className="py-1 hover:brightness-110 transition cursor-pointer">Documentation</li>
            <li className="py-1 hover:brightness-110 transition cursor-pointer">Guides</li>
            {/* <li className='py-1'>API Status</li> */}
          </ul>
        </div>
        <div className="min-w-[8rem]">
          <h6 className="font-bold uppercase pt-2">Company</h6>
          <ul>
            <li className="py-1 hover:brightness-110 transition cursor-pointer">About</li>
            <li className="py-1 hover:brightness-110 transition cursor-pointer">Blog</li>
            <li className="py-1 hover:brightness-110 transition cursor-pointer">Jobs</li>
            <li className="py-1 hover:brightness-110 transition cursor-pointer">Press</li>
            <li className="py-1 hover:brightness-110 transition cursor-pointer">Partners</li>
          </ul>
        </div>
        <div className="min-w-[8rem]">
          <h6 className="font-bold uppercase pt-2">Legal</h6>
          <ul>
            <li className="py-1 hover:brightness-110 transition cursor-pointer">Claims</li>
            <li className="py-1 hover:brightness-110 transition cursor-pointer">Privacy</li>
            <li className="py-1 hover:brightness-110 transition cursor-pointer">Terms</li>
            <li className="py-1 hover:brightness-110 transition cursor-pointer">Policies</li>
            <li className="py-1 hover:brightness-110 transition cursor-pointer">Conditions</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col max-w-[1240px] px-2 py-4 mx-auto justify-between sm:flex-row text-center text-gray-500">
        <p className="py-4">2022 Heizen Berg Co. All rights reserved</p>
        <div className="flex justify-between sm:w-[300px] pt-4 text-2xl">
          <FaFacebook className="hover:brightness-150 transition cursor-pointer" />
          <FaInstagram className="hover:brightness-150 transition cursor-pointer" />
          <FaYoutube className="hover:brightness-150 transition cursor-pointer" />
          <FaTwitter className="hover:brightness-150 transition cursor-pointer" />
          <FaLinkedin className="hover:brightness-150 transition cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
