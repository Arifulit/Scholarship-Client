
const Advertisement = () => {
    return (
        <div className="w-full">
            <div className="carousel w-full h-screen">
                
                {/* Slide 1 */}
                <div id="slide1" className="carousel-item relative w-full h-full">
                    <img
                        src="https://cdn.experteducation.com/wp-content/uploads/sites/15/2023/09/20180924/Scholarships-for-USA.jpg"
                        className="w-full h-full object-cover"
                        alt="Scholarship Types"
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-5">
                        <a href="#slide3" className="btn btn-circle bg-transparent border-none text-white text-4xl hover:text-gray-300">❮</a>
                        <a href="#slide2" className="btn btn-circle bg-transparent border-none text-white text-4xl hover:text-gray-300">❯</a>
                    </div>
                </div>

                {/* Slide 2 */}
                <div id="slide2" className="carousel-item relative w-full h-full">
                    <img
                        src="https://www.lsbu.ac.uk/__data/assets/image/0010/246367/Graduation-1316x567.jpg"
                        className="w-full h-full object-cover"
                        alt="Graduation Ceremony"
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-5">
                        <a href="#slide1" className="btn btn-circle bg-transparent border-none text-white text-4xl hover:text-gray-300">❮</a>
                        <a href="#slide3" className="btn btn-circle bg-transparent border-none text-white text-4xl hover:text-gray-300">❯</a>
                    </div>
                </div>

                {/* Slide 3 */}
                <div id="slide3" className="carousel-item relative w-full h-full">
                    <img
                        src="https://www.scholarshipsinindia.com/wp-content/themes/unicat/images/home/scholarship213.jpg"
                        className="w-full h-full object-cover"
                        alt="Scholarship Opportunities"
                    />
                    <div className="absolute inset-0 flex items-center justify-between px-5">
                        <a href="#slide2" className="btn btn-circle bg-transparent border-none text-white text-4xl hover:text-gray-300">❮</a>
                        <a href="#slide1" className="btn btn-circle bg-transparent border-none text-white text-4xl hover:text-gray-300">❯</a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Advertisement;
