import { useNavigate } from 'react-router-dom';

import { FaSearch } from 'react-icons/fa';
import { AiFillStar, AiFillFire, AiOutlineCheckCircle, AiOutlineCloseCircle } from 'react-icons/ai';

const ProductGridCard = ({ product, newarrival, bestseller }) => {
  const navigate = useNavigate();

  const renderStars = (score) => {
    let stars = 0;
    const renderedStars = [];

    if (Number.isInteger(score)) {
      stars = score;
    } else {
      stars = Math.floor(score);
    }

    for (let i = 0; i < stars; i++) {
      renderedStars.push(<AiFillStar />);
    }

    return renderedStars;
  };

  return (
    <div className="h-[340px] w-60 md:w-56 flex flex-col justify-center items-center rounded-lg overflow-hidden border relative shadow-md group">
      <div className="absolute z-2 inset-0 bg-gray-600 bg-opacity-0 group-hover:bg-opacity-30 group-hover:backdrop-blur-sm transition-all"></div>
      <div
        onClick={() => navigate(`/product/${product.id}`)}
        className="h-12 w-12 rounded-full bg-white absolute z-3 my-auto mx-auto opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-sky-600 active:scale-95 cursor-pointer"
      >
        <FaSearch className="hover:brightness-125 transition" />
      </div>
      <div className="w-full h-1/2 flex justify-center items-center bg-white border-b">
        <img src={product.image} className="h-full object-contain" />
      </div>
      <div className="w-full h-1/2 bg-gray-50">
        <div className="pt-1 px-3 flex items-center">
          <span className="text-lg leading-snug font-semibold text-sky-900 cursor-pointer w-full max-h-14 line-clamp-2">
            {product.name}
          </span>
        </div>
        <div className="w-full flex items-end pl-3">
          <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-sky-500 bg-clip-text text-transparent">
            Rp. {product.price_sell?.toLocaleString('id')}
          </span>
          <span className="text-md font-semibold text-sky-500">/{product.unit}</span>
        </div>
        {product.totalReviews ? (
          <div className="w-full py-[2px] px-3 flex items-center gap-1 text-sm">
            <div className="flex text-amber-300">{renderStars(product.avgRating)}</div>
            <span className="font-semibold text-slate-700">({product.totalReviews})</span>
          </div>
        ) : null}
        <div className="px-3 mb-[2px] flex gap-1 items-center text-sm font-semibold">
          {product.stock_in_unit ? (
            product.stock_in_unit <= 5 * product.volume ? (
              <>
                <AiFillFire className="text-orange-500" />
                <span>
                  {!Math.floor(product.stock_in_unit / product.volume)
                    ? `Last item!`
                    : `${Math.floor(product.stock_in_unit / product.volume)} remaining!`}
                </span>
              </>
            ) : (
              <>
                <AiOutlineCheckCircle className="text-sky-400" />
                <span>Currently in stock!</span>
              </>
            )
          ) : (
            <>
              <AiOutlineCloseCircle className="text-red-400" />
              <span>Out of stock</span>
            </>
          )}
        </div>
        <div className="w-full py-1 flex gap-1 items-center px-3">
          {newarrival && (
            <span className="h-6 px-2 rounded-md bg-green-300 text-green-600 flex items-center font-semibold text-xs">New Arrival</span>
          )}
          {bestseller && (
            <span className="h-6 px-2 rounded-md bg-amber-200 text-amber-600 flex items-center font-semibold text-xs">Best Seller</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGridCard;
