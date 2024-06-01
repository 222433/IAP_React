import { FC, useEffect, useRef } from "react";
import { Menu } from "./Menu/Menu";
import { Product } from "./data-model";
import { useState } from "react";
export const AddProduct: FC<{}> = ({ }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [file, setFile] = useState<File | null>();
    const previewImage = useRef<HTMLImageElement>(null);
    useEffect(() => {
        console.log(file)

        if (!!file && !!previewImage.current) {
            const fileReader = new FileReader();
            const preview = document.getElementById('file-preview');

            fileReader.onload = function (event: ProgressEvent<FileReader>) {
                console.log(event.target?.result?.toString() as string)
                previewImage.current?.setAttribute('src', event.target?.result?.toString() as string);
            }
            fileReader.readAsDataURL(file);
        }

    }, [file])
    const sendData = async (e: any) => {

        e.preventDefault();

        const body = new FormData();
        body.append('name', name);
        body.append('price', price.toString());
        body.append('file', file as File, file?.name);
        //const buffer = await file?.arrayBuffer();
        await fetch('https://localhost/products/insert', {
            method: 'POST',
            credentials: 'include',

            body: body
        });
    };

    return (
        <div className="container">
            <Menu></Menu>
            <div className="row justify-content-center">
                <form action="https://localhost/products/insert" method="post" className="col-md-4 mt-3">
                    <div className="form-group mt-3">
                        <label>Product name</label>
                        <input onChange={e => setName(e.target.value)} value={name} type="text" className="form-control" />
                    </div>
                    <div className="form-group mt-3">
                        <label>Price</label>
                        <input onChange={e => setPrice(Number(e.target.value))} value={price} type="number" className="form-control" />
                    </div>
                    <div className="form-group mt-5 text-center">
                        <div
                            className="border border-primary">
                            <img ref={previewImage}></img>
                        </div>
                    </div>
                    <div className="form-group mt-3">
                        <input onChange={e => setFile(e.target.files && e.target.files[0])} type="file" className="form-control-file" />
                        <button onClick={sendData} type="submit" className="button button-warning">Ok</button>
                    </div>

                </form>


            </div>

        </div>
    );
}