import {useForm} from "react-hook-form";
import "../Styles/Form.css";

const VehicleForm = () => {
    const {
        register, 
        handleSubmit,
        formState: {errors},
    } = useForm({
        defaultValues: {
            vehicleId : "V101",
            brand : "Honda",
            model: "Activa 6g",
            type : "Cruiser",
            engineCC: 350,
            rentPerDay: 800,
            availability: true,
            image: "https://example.com/yamaha-fz.jpg"
        }
    });
    
    const onSubmitHandler = (fdata) => {
        fdata.vehicleId = Date.now();
        console.log(fdata);
        alert("data added successfully");
    };

  return (
    <div>
      <form className="forms" onSubmit={handleSubmit(onSubmitHandler)}>
        <h2>Vehicle Details</h2>
        <label>Vehicle Id</label>
        <input {...register("vehicleId",
            {required: "Id id required",
             minLength: {value: 4, message: "More than 4"}, 
            })} type="text"></input>
        {errors.vehicleId && <p>{errors.vehicleId.message}</p>}
        <label>Vehicle Brand</label>
        <input {...register("brand")} type="text"></input>
        <label>Vehicle Model</label>
        <input {...register("model")} type="text"></input>
        <label>Type</label>
        <input {...register("type")} type="text"></input>
        <label>Engine</label>
        <input {...register("engineCC")} type="number"></input>
        <label>Rent Per Day</label>
        <input {...register("rentPerDay")} type="number"></input>
        <label>Availability</label>
        <input {...register("availability")} type="text"></input>
        <label>Image</label>
        <input {...register("image")} type="text"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VehicleForm;