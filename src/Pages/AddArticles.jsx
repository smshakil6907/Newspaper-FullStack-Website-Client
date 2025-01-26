import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import Swal from "sweetalert2";
import useAxiosPublic from "../Hoks/useAxiosPublic";
import { AuthContext } from "../Provider/AuthProvider";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

export default function AddArticles() {
  const { register, handleSubmit, reset, control } = useForm();
  const [tags, setTags] = useState([]);
  const axiosPublic = useAxiosPublic();
  const { user } = useContext(AuthContext);
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    const fetchPublishers = async () => {
      const response = await axiosPublic.get("/publisher");
      setPublishers(response.data);
    };
    fetchPublishers();
  }, [axiosPublic]);

  const onSubmit = async (data) => {
    console.log({
      ...data,
      tags: tags.map((tag) => tag.value),
    });
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const addArticle = {
        title: data.title,
        email: user.email,
        authorName: user.displayName,
        authorPhoto: user.photoURL,
        publisher: data.publisher,
        tags: data.tags,
        description: data.description,
        image: res.data.data.display_url,
        postedDate: new Date().toISOString(),
      };
      const addRess = await axiosPublic.post("/articles", addArticle);
      console.log(addRess.data);
      Swal.fire({
        title: "Success!",
        text: "Your article has been successfully submitted.",
        icon: "success",
        confirmButtonText: "OK",
      });
    }
    reset();
    console.log(res.data);
  };

  const options = [
    { value: "Technology", label: "Technology" },
    { value: "Sports", label: "Sports" },
    { value: "Health", label: "Health" },
    { value: "Entertainment", label: "Entertainment" },
  ];

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full my-6">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input
            type="text"
            placeholder="Type here"
            {...register("title")}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div className="flex gap-4">
          <div className="form-control w-full">
            <div className="label">
              <span className="label-text">Publisher*</span>
            </div>
            <select
              {...register("publisher")}
              className="select select-bordered w-full"
              required
            >
              <option value="" disabled selected>
                Select a Publisher
              </option>
              {publishers.map((publisher) => (
                <option key={publisher._id} value={publisher.name}>
                  {publisher.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control w-full">
            <div className="label">
              <span className="label-text">Tags*</span>
            </div>
            <Controller
              name="tags"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <Select
                  {...register("image")}
                  options={options}
                  isMulti
                  value={tags}
                  onChange={(selectedOptions) => {
                    setTags(selectedOptions);
                  }}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              )}
            />
          </div>
        </div>
        <div className="form-control">
          <div className="label">
            <span className="label-text">Description</span>
          </div>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Description"
            {...register("description")}
            required
          ></textarea>
        </div>
        <div className="form-control w-full my-6">
          <input
            {...register("image")}
            type="file"
            className="file-input w-full max-w-xs"
            accept="image/*"
            required
          />
        </div>
        <button className="btn">Add Article</button>
      </form>
    </div>
  );
}
