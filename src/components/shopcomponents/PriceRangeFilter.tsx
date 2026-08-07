import React from "react";
// import "./pricefilter.css";

interface PriceFilterProps {
    min: number;
    max: number;
    value: [number, number];
    onChange: (value: [number, number]) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
    min,
    max,
    value,
    onChange,
}) => {

    const [minValue, maxValue] = value;


    const minPercent =
        ((minValue - min) / (max - min)) * 100;

    const maxPercent =
        ((maxValue - min) / (max - min)) * 100;



    return (
        <div className="price-filter-modern">


            <div className="price-filter-heading">
                <h6>Price</h6>

                <button
                    className="price-reset"
                    onClick={() => onChange([min, max])}
                >
                    Reset
                </button>
            </div>



            {/* Inputs */}

            <div className="price-inputs">


                <div className="price-input-wrapper">

                    <span>Min</span>

                    <div className="price-input">

                        <span>₵</span>

                        <input
                            type="number"
                            value={minValue}
                            onChange={(e)=> {
                                const value =
                                    Number(e.target.value);

                                onChange([
                                    Math.min(value, maxValue),
                                    maxValue
                                ]);
                            }}
                        />

                    </div>

                </div>



                <div className="price-separator">
                    —
                </div>



                <div className="price-input-wrapper">

                    <span>Max</span>

                    <div className="price-input">

                        <span>₵</span>

                        <input
                            type="number"
                            value={maxValue}
                            onChange={(e)=> {

                                const value =
                                    Number(e.target.value);

                                onChange([
                                    minValue,
                                    Math.max(value,minValue)
                                ]);
                            }}
                        />

                    </div>

                </div>


            </div>





            {/* Slider */}

            <div className="modern-slider">


                <div className="modern-slider-track" />


                <div
                    className="modern-slider-active"
                    style={{
                        left:`${minPercent}%`,
                        width:`${maxPercent-minPercent}%`
                    }}
                />



                <input
                    className="modern-range"
                    type="range"
                    min={min}
                    max={max}
                    value={minValue}
                    onChange={(e)=>{

                        const value =
                            Number(e.target.value);

                        onChange([
                            Math.min(value,maxValue-1),
                            maxValue
                        ]);

                    }}
                />



                <input
                    className="modern-range modern-range-max"
                    type="range"
                    min={min}
                    max={max}
                    value={maxValue}
                    onChange={(e)=>{

                        const value =
                            Number(e.target.value);

                        onChange([
                            minValue,
                            Math.max(value,minValue+1)
                        ]);

                    }}
                />


            </div>




            <div className="price-range-labels">

                <span>
                    ₵{min.toLocaleString()}
                </span>


                <span>
                    ₵{max.toLocaleString()}
                </span>

            </div>


        </div>
    );
};


export default PriceFilter;