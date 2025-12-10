import Slider from 'react-slick'
const MostPopular = () => {
  const settingPopular = {
    centerMode: true,
    centerPadding: '30px',
    slidesToShow: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  }
  return (
    <div className='osahan-popular'>
      <div className='d-none'>
        <div className='bg-primary border-bottom p-3 d-flex align-items-center'>
          <a className='toggle togglew toggle-2' href='#'>
            <span></span>
          </a>
          <h4 className='font-weight-bold m-0 text-white'>List</h4>
        </div>
      </div>

      <div className='container'>
        <div className='most_popular py-5'>
          <div className='d-flex align-items-center mb-4'>
            <h3 className='font-weight-bold text-dark mb-0'>Phổ biến nhất</h3>
            <a href='#' data-toggle='modal' data-target='#filters' className='ml-auto btn btn-primary'>
              Lọc
            </a>
          </div>
          <div className='row'>
            <div className='col-12 col-md-4 mb-3'>
              <div className='list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm'>
                <div className='list-card-image'>
                  <div className='popular-slider'>
                  <Slider {...settingPopular}>
                  <div className='osahan-slider-item'>
                      <a href='restaurant.html'>
                        <img alt='#' src='img/popular1.png' className='img-fluid item-img w-100 rounded' />
                      </a>
                    </div>
                    <div className='osahan-slider-item'>
                      <a href='restaurant.html'>
                        <img alt='#' src='img/popular2.png' className='img-fluid item-img w-100 rounded' />
                      </a>
                    </div>
                    <div className='osahan-slider-item'>
                      <a href='restaurant.html'>
                        <img alt='#' src='img/popular3.png' className='img-fluid item-img w-100 rounded' />
                      </a>
                    </div>
                  </Slider>
                    
                    
                  </div>
                </div>
                <div className='p-3 position-relative'>
                  <div className='list-card-body'>
                    <h6 className='mb-1'>
                      <a href='restaurant.html' className='text-black'>
                        The osahan Restaurant
                      </a>
                    </h6>
                    <p className='text-gray mb-3'>North • Hamburgers • Pure veg</p>
                    <p className='text-gray mb-3 time'>
                      <span className='bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2'>
                        <i className='feather-clock'></i> 15–25 min
                      </span>{' '}
                      <span className='float-right text-black-50'> $500 FOR TWO</span>
                    </p>
                  </div>
                  <div className='list-card-badge'>
                    <span className='badge badge-danger'>OFFER</span> <small>65% OSAHAN50</small>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-12 col-md-4 mb-3'>
              <div className='list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm'>
                <div className='list-card-image'>
                  <div className='popular-slider'>
                  <Slider {...settingPopular}>
                    <div className='osahan-slider-item'>
                      <a href='restaurant.html'>
                        <img alt='#' src='img/popular7.png' className='img-fluid item-img w-100 rounded' />
                      </a>
                    </div>
                    <div className='osahan-slider-item'>
                      <a href='restaurant.html'>
                        <img alt='#' src='img/popular8.png' className='img-fluid item-img w-100 rounded' />
                      </a>
                    </div>
                    <div className='osahan-slider-item'>
                      <a href='restaurant.html'>
                        <img alt='#' src='img/popular6.png' className='img-fluid item-img w-100 rounded' />
                      </a>
                    </div>
                    </Slider>
                  </div>
                </div>
                <div className='p-3 position-relative'>
                  <div className='list-card-body'>
                    <h6 className='mb-1'>
                      <a href='restaurant.html' className='text-black'>
                        Bayfront Catering Restaurant
                      </a>
                    </h6>
                    <p className='text-gray mb-3'>North • Hamburgers • Pure veg</p>
                    <p className='text-gray mb-3 time'>
                      <span className='bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2'>
                        <i className='feather-clock'></i> 15–25 min
                      </span>{' '}
                      <span className='float-right text-black-50'> $500 FOR TWO</span>
                    </p>
                  </div>
                  <div className='list-card-badge'>
                    <span className='badge badge-danger'>OFFER</span> <small>65% OSAHAN50</small>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-12 col-md-4 mb-3'>
              <div className='list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm'>
                <div className='list-card-image'>
                  <div className='popular-slider'>
                  <Slider {...settingPopular}>
                    <div className='osahan-slider-item'>
                      <a href='restaurant.html'>
                        <img alt='#' src='img/popular4.png' className='img-fluid item-img w-100 rounded' />
                      </a>
                    </div>
                    <div className='osahan-slider-item'>
                      <a href='restaurant.html'>
                        <img alt='#' src='img/popular5.png' className='img-fluid item-img w-100 rounded' />
                      </a>
                    </div>
                    <div className='osahan-slider-item'>
                      <a href='restaurant.html'>
                        <img alt='#' src='img/popular6.png' className='img-fluid item-img w-100 rounded' />
                      </a>
                    </div>
                    </Slider>
                  </div>
                </div>
                <div className='p-3 position-relative'>
                  <div className='list-card-body'>
                    <h6 className='mb-1'>
                      <a href='restaurant.html' className='text-black'>
                        Conrad Chicago Restaurant
                      </a>
                    </h6>
                    <p className='text-gray mb-3'>North • Hamburgers • Pure veg</p>
                    <p className='text-gray mb-3 time'>
                      <span className='bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2'>
                        <i className='feather-clock'></i> 15–25 min
                      </span>{' '}
                      <span className='float-right text-black-50'> $500 FOR TWO</span>
                    </p>
                  </div>
                  <div className='list-card-badge'>
                    <span className='badge badge-danger'>OFFER</span> <small>65% OSAHAN50</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-md-4 mb-3'>
              <div className='list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm'>
                <div className='list-card-image'>
                  <div className='popular-slider'>
                  <Slider {...settingPopular}>
                    <div className='osahan-slider-item'>
                      <a href='restaurant.html'>
                        <img alt='#' src='img/popular6.png' className='img-fluid item-img w-100 rounded' />
                      </a>
                    </div>
                    <div className='osahan-slider-item'>
                      <a href='restaurant.html'>
                        <img alt='#' src='img/popular5.png' className='img-fluid item-img w-100 rounded' />
                      </a>
                    </div>
                    <div className='osahan-slider-item'>
                      <a href='restaurant.html'>
                        <img alt='#' src='img/popular4.png' className='img-fluid item-img w-100 rounded' />
                      </a>
                    </div>
                    </Slider>
                  </div>
                </div>
                <div className='p-3 position-relative'>
                  <div className='list-card-body'>
                    <h6 className='mb-1'>
                      <a href='restaurant.html' className='text-black'>
                        Conrad Chicago Restaurant
                      </a>
                    </h6>
                    <p className='text-gray mb-3'>North • Hamburgers • Pure veg</p>
                    <p className='text-gray mb-3 time'>
                      <span className='bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2'>
                        <i className='feather-clock'></i> 15–25 min
                      </span>{' '}
                      <span className='float-right text-black-50'> $500 FOR TWO</span>
                    </p>
                  </div>
                  <div className='list-card-badge'>
                    <span className='badge badge-danger'>OFFER</span> <small>65% OSAHAN50</small>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-12 col-md-4 mb-3'>
              <div className='list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm'>
                <div className='list-card-image'>
                  <div className='popular-slider'>
                  <Slider {...settingPopular}>
                    <div className='osahan-slider-item'>
                      <a href='restaurant.html'>
                        <img alt='#' src='img/popular3.png' className='img-fluid item-img w-100 rounded' />
                      </a>
                    </div>
                    <div className='osahan-slider-item'>
                      <a href='restaurant.html'>
                        <img alt='#' src='img/popular2.png' className='img-fluid item-img w-100 rounded' />
                      </a>
                    </div>
                    <div className='osahan-slider-item'>
                      <a href='restaurant.html'>
                        <img alt='#' src='img/popular1.png' className='img-fluid item-img w-100 rounded' />
                      </a>
                    </div>
                    </Slider>
                  </div>
                </div>
                <div className='p-3 position-relative'>
                  <div className='list-card-body'>
                    <h6 className='mb-1'>
                      <a href='restaurant.html' className='text-black'>
                        The osahan Restaurant
                      </a>
                    </h6>
                    <p className='text-gray mb-3'>North • Hamburgers • Pure veg</p>
                    <p className='text-gray mb-3 time'>
                      <span className='bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2'>
                        <i className='feather-clock'></i> 15–25 min
                      </span>{' '}
                      <span className='float-right text-black-50'> $500 FOR TWO</span>
                    </p>
                  </div>
                  <div className='list-card-badge'>
                    <span className='badge badge-danger'>OFFER</span> <small>65% OSAHAN50</small>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-12 col-md-4 mb-3'>
              <div className='list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm'>
                <div className='list-card-image'>
                  <div className='popular-slider'>
                    <Slider {...settingPopular}>
                    <div className='osahan-slider-item'>
                      <a href='restaurant.html'>
                        <img alt='#' src='img/popular8.png' className='img-fluid item-img w-100 rounded' />
                      </a>
                    </div>
                    <div className='osahan-slider-item'>
                      <a href='restaurant.html'>
                        <img alt='#' src='img/popular7.png' className='img-fluid item-img w-100 rounded' />
                      </a>
                    </div>
                    <div className='osahan-slider-item'>
                      <a href='restaurant.html'>
                        <img alt='#' src='img/popular6.png' className='img-fluid item-img w-100 rounded' />
                      </a>
                    </div>
                    </Slider>
                  </div>
                </div>
                <div className='p-3 position-relative'>
                  <div className='list-card-body'>
                    <h6 className='mb-1'>
                      <a href='restaurant.html' className='text-black'>
                        Bayfront Catering Restaurant
                      </a>
                    </h6>
                    <p className='text-gray mb-3'>North • Hamburgers • Pure veg</p>
                    <p className='text-gray mb-3 time'>
                      <span className='bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2'>
                        <i className='feather-clock'></i> 15–25 min
                      </span>{' '}
                      <span className='float-right text-black-50'> $500 FOR TWO</span>
                    </p>
                  </div>
                  <div className='list-card-badge'>
                    <span className='badge badge-danger'>OFFER</span> <small>65% OSAHAN50</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-12 col-md-4 mb-3'>
              <div className='list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm'>
                <div className='list-card-image'>
                  <div className='popular-slider'>
                    <Slider {...settingPopular}>
                    <div className='osahan-slider-item'>
                      <a href='restaurant.html'>
                        <img alt='#' src='img/popular5.png' className='img-fluid item-img w-100 rounded' />
                      </a>
                    </div>
                    <div className='osahan-slider-item'>
                      <a href='restaurant.html'>
                        <img alt='#' src='img/popular4.png' className='img-fluid item-img w-100 rounded' />
                      </a>
                    </div>
                    <div className='osahan-slider-item'>
                      <a href='restaurant.html'>
                        <img alt='#' src='img/popular3.png' className='img-fluid item-img w-100 rounded' />
                      </a>
                    </div>
                    </Slider>
                  </div>
                </div>
                <div className='p-3 position-relative'>
                  <div className='list-card-body'>
                    <h6 className='mb-1'>
                      <a href='restaurant.html' className='text-black'>
                        Bayfront Catering Restaurant
                      </a>
                    </h6>
                    <p className='text-gray mb-3'>North • Hamburgers • Pure veg</p>
                    <p className='text-gray mb-3 time'>
                      <span className='bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2'>
                        <i className='feather-clock'></i> 15–25 min
                      </span>{' '}
                      <span className='float-right text-black-50'> $500 FOR TWO</span>
                    </p>
                  </div>
                  <div className='list-card-badge'>
                    <span className='badge badge-danger'>OFFER</span> <small>65% OSAHAN50</small>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-12 col-md-4 mb-3'>
              <div className='list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm'>
                <div className='list-card-image'>
                  <div className='popular-slider'>
                    <Slider {...settingPopular}>
                    <div className='osahan-slider-item'>
                      <a href='restaurant.html'>
                        <img alt='#' src='img/popular2.png' className='img-fluid item-img w-100 rounded' />
                      </a>
                    </div>
                    <div className='osahan-slider-item'>
                      <a href='restaurant.html'>
                        <img alt='#' src='img/popular3.png' className='img-fluid item-img w-100 rounded' />
                      </a>
                    </div>
                    <div className='osahan-slider-item'>
                      <a href='restaurant.html'>
                        <img alt='#' src='img/popular4.png' className='img-fluid item-img w-100 rounded' />
                      </a>
                    </div>
                    </Slider>
                  </div>
                </div>
                <div className='p-3 position-relative'>
                  <div className='list-card-body'>
                    <h6 className='mb-1'>
                      <a href='restaurant.html' className='text-black'>
                        Conrad Chicago Restaurant
                      </a>
                    </h6>
                    <p className='text-gray mb-3'>North • Hamburgers • Pure veg</p>
                    <p className='text-gray mb-3 time'>
                      <span className='bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2'>
                        <i className='feather-clock'></i> 15–25 min
                      </span>{' '}
                      <span className='float-right text-black-50'> $500 FOR TWO</span>
                    </p>
                  </div>
                  <div className='list-card-badge'>
                    <span className='badge badge-danger'>OFFER</span> <small>65% OSAHAN50</small>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-12 col-md-4 mb-3'>
              <div className='list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm'>
                <div className='list-card-image'>
                  <div className='popular-slider'>
                    <Slider {...settingPopular}>
                    <div className='osahan-slider-item'>
                      <a href='restaurant.html'>
                        <img alt='#' src='img/popular1.png' className='img-fluid item-img w-100 rounded' />
                      </a>
                    </div>
                    <div className='osahan-slider-item'>
                      <a href='restaurant.html'>
                        <img alt='#' src='img/popular2.png' className='img-fluid item-img w-100 rounded' />
                      </a>
                    </div>
                    <div className='osahan-slider-item'>
                      <a href='restaurant.html'>
                        <img alt='#' src='img/popular3.png' className='img-fluid item-img w-100 rounded' />
                      </a>
                    </div>
                    </Slider>
                  </div>
                </div>
                <div className='p-3 position-relative'>
                  <div className='list-card-body'>
                    <h6 className='mb-1'>
                      <a href='restaurant.html' className='text-black'>
                        The osahan Restaurant
                      </a>
                    </h6>
                    <p className='text-gray mb-3'>North • Hamburgers • Pure veg</p>
                    <p className='text-gray mb-3 time'>
                      <span className='bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2'>
                        <i className='feather-clock'></i> 15–25 min
                      </span>{' '}
                      <span className='float-right text-black-50'> $500 FOR TWO</span>
                    </p>
                  </div>
                  <div className='list-card-badge'>
                    <span className='badge badge-danger'>OFFER</span> <small>65% OSAHAN50</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='osahan-menu-fotter fixed-bottom bg-white px-3 py-2 text-center d-none'>
        <div className='row'>
          <div className='col'>
            <a href='home.html' className='text-dark small font-weight-bold text-decoration-none'>
              <p className='h4 m-0'>
                <i className='feather-home'></i>
              </p>
              Home
            </a>
          </div>
          <div className='col selected'>
            <a href='trending.html' className='text-danger small font-weight-bold text-decoration-none'>
              <p className='h4 m-0'>
                <i className='feather-map-pin text-danger'></i>
              </p>
              Trending
            </a>
          </div>
          <div className='col bg-white rounded-circle mt-n4 px-3 py-2'>
            <div className='bg-danger rounded-circle mt-n0 shadow'>
              <a href='checkout.html' className='text-white small font-weight-bold text-decoration-none'>
                <i className='feather-shopping-cart'></i>
              </a>
            </div>
          </div>
          <div className='col'>
            <a href='favorites.html' className='text-dark small font-weight-bold text-decoration-none'>
              <p className='h4 m-0'>
                <i className='feather-heart'></i>
              </p>
              Favorites
            </a>
          </div>
          <div className='col'>
            <a href='profile.html' className='text-dark small font-weight-bold text-decoration-none'>
              <p className='h4 m-0'>
                <i className='feather-user'></i>
              </p>
              Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MostPopular
