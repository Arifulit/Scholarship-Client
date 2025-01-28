
const Advertisemest = () => {
    return (
        <div>
            <div className="carousel w-full  sm:h-[60vh] lg:h-[60vh] ">
                <div id="slide1" className="carousel-item relative w-full ">
                    <img
                        src="https://www.euroschoolindia.com/wp-content/uploads/2023/06/types-of-scholarship-for-students.jpg"

                        className="w-full h-full object-cover"
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide4" className="btn btn-circle"></a>
                        <a href="#slide2" className="btn btn-circle"></a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full ">
                    <img
                        
                        src="https://www.lsbu.ac.uk/__data/assets/image/0010/246367/Graduation-1316x567.jpg"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>

                <div id="slide3" className="carousel-item relative w-full ">
                    <img
                        src="https://www.scholarshipsinindia.com/wp-content/themes/unicat/images/home/scholarship213.jpg"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Advertisemest;
