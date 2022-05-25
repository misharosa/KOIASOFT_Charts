import * as React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { TextField, Autocomplete } from "@mui/material";
import "./App.css"

import { getData } from "./server/api"
import { chartData, options } from "./data/data"
import { ChartBar } from "./charts/ChartBar";
import { FormValues, Option } from "./types/types";

export const App = () => {
    let navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [chartDataFromServer, setChartDataFromServer] = useState()

    const [params] = useState(
        {
            start: searchParams.get("start") ? searchParams.get("start") : "",
            end: searchParams.get("end") ? searchParams.get("end") : "",
            type: searchParams.get("type") ? searchParams.get("type") : ""
        }
    )
    const {
        handleSubmit,
        setValue,
        formState: {errors}
    } = useForm<FormValues>({
            defaultValues: {
                start: searchParams.get("start") ? String(searchParams.get("start")) : "",
                end: searchParams.get("end") ? String(searchParams.get("end")) : "",
                type: searchParams.get("type") ? String(searchParams.get("type")) : ""
            }
        }
    );
    useEffect(() => {
        let start = searchParams.get("start")
        let end = searchParams.get("end")
        let type = searchParams.get("type")
        if (start && end && type) {
            getData({start, end, type}).then((data: any) => {
                setChartDataFromServer(data)
            });
        }
    }, [searchParams])

    const onSubmit = handleSubmit((data) => {
        if (Object.keys(data).length !== 0) {
            navigate({
                search: `?start=${data.start}&end=${data.end}&type=${data.type}`,
            });
            getData(data).then((data: any) => {
                setChartDataFromServer(data)
            });
        }
    })

    const handleAutocomplete = (e: object, chartData: any, key: any) => {
            sessionStorage.setItem(key, chartData?.label ? chartData?.label : "");
            setValue(key, chartData?.label)
        }


    return (
        <div className="App">
            <h1>KOIASOFT</h1>
            <form className="form" onSubmit={onSubmit}>
                <section>
                    <label>Start Date </label>
                    <Autocomplete
                        isOptionEqualToValue={(option, value) => option?.label === value?.label}
                        options={chartData}
                        defaultValue={{value: String(params.start), label: String(params.start)}}
                        getOptionLabel={(option: Option) => option.label}
                        onChange={(e, chartData) => handleAutocomplete(e, chartData, 'start')}
                        renderInput={(params: object) => (
                            <TextField
                                {...params}
                                error={Boolean(errors?.start)}
                                helperText={errors?.start?.message}
                            />
                        )}
                    />
                </section>

                <section>
                    <label>End Date</label>
                    <Autocomplete
                        isOptionEqualToValue={(option, value) => option?.label === value?.label}
                        options={chartData}
                        getOptionLabel={(option) => {
                            return option.label || "";
                        }}
                        defaultValue={{value: String(params.end), label: String(params.end)}}
                        onChange={(e, chartData) => handleAutocomplete(e, chartData, 'end')}
                        renderInput={(params: any) => (
                            <TextField
                                {...params}
                                error={Boolean(errors?.end)}
                                helperText={errors?.end?.message}
                            />
                        )}
                    />
                </section>
                <section>
                    <label>Home Type</label>
                    <Autocomplete
                        isOptionEqualToValue={(option, value) => option?.label === value?.label}
                        options={options}
                        defaultValue={{
                            value: String(params.type),
                            label: String(options.find((item) => item.value === params.type)?.label||'')
                        }}
                        getOptionLabel={(option: Option) => option?.label}
                        onChange={(e: any, options: any) => {
                            sessionStorage.setItem('type', options?.value ? options?.value : "");
                            setValue("type", options?.value)
                        }}
                        renderInput={(params: any) => (
                            <TextField
                                {...params}
                                error={Boolean(errors?.type)}
                                helperText={errors?.type?.message}
                            />
                        )}
                    />
                </section>

                <input type="submit" className="button"/>
            </form>
            {chartDataFromServer && <ChartBar chartDataFromServer={chartDataFromServer}  />}
        </div>
    );
}