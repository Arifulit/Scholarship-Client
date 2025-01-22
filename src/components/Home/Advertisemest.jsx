
const Advertisemest = () => {
    return (
        <div>
            <div className="carousel w-full  sm:h-[60vh] lg:h-[60vh] ">
                <div id="slide1" className="carousel-item relative w-full ">
                    <img
                        src="https://images.pexels.com/photos/139398/thermometer-headache-pain-pills-139398.jpeg?cs=srgb&dl=pexels-pixabay-139398.jpg&fm=jpg"

                        className="w-full h-full object-cover"
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide4" className="btn btn-circle"></a>
                        <a href="#slide2" className="btn btn-circle"></a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full ">
                    <img
                        src="https://media.istockphoto.com/id/1358014313/photo/group-of-elementary-students-having-computer-class-with-their-teacher-in-the-classroom.jpg?s=612x612&w=0&k=20&c=3xsykmHXFa9ejL_sP2Xxiow7zdtmKvg15UxXFfgR98Q="
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>

                <div id="slide3" className="carousel-item relative w-full ">
                    <img
                        src="https://media.istockphoto.com/id/1470810742/photo/kindergarten-students-with-their-teacher.jpg?s=612x612&w=0&k=20&c=11OzDQwQY1683ictafKGI4KObiEHbmvoUWCS9D8SDNA="
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
