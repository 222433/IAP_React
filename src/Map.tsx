import { FC, useRef, useState, useEffect, useMemo } from "react"
import React from "react"
import map from './assets/map.jpg'
import map_marker from './assets/map_marker.png'
import red_dot from './assets/red_dot.jpg'
import green_dot from './assets/green_dot.png'
import { Tooltip } from 'react-tooltip'
import { bufferTime, tap, throttleTime } from "rxjs"
import { bind } from "@react-rxjs/core"
import { createSignal } from "@react-rxjs/utils"
import { text } from "stream/consumers"
import { fromEvent } from "rxjs"
import { prepareNewState } from "./prepareNewState"

function getRelativeCoordinates(event: any, referenceElement: HTMLElement) {

    const position = {
        x: event.pageX,
        y: event.pageY
    };

    const offset = {
        left: referenceElement.offsetLeft,
        top: referenceElement.offsetTop
    };

    let reference: HTMLElement = referenceElement.offsetParent as HTMLElement;

    while (reference) {
        offset.left += reference.offsetLeft;
        offset.top += reference.offsetTop;
        reference = reference.offsetParent as HTMLElement;
    }

    return {
        x: position.x - offset.left,
        y: position.y - offset.top,
    };

}

interface MapPoint {
    x: number, y: number, icon: string, placeholder?: string
}
interface City {
    x: number, y: number, name: string
}

interface CityPoint extends City {
    selected: boolean
}

const mapConfiguration: MapPoint[] = [{ x: 233, y: 139, icon: red_dot, placeholder: 'City1' },
{ x: 101, y: 198, icon: red_dot, placeholder: 'City2' },
{ x: 197, y: 240, icon: red_dot, placeholder: 'City3' },
{ x: 156, y: 78, icon: red_dot, placeholder: 'City4' },
{ x: 61, y: 102, icon: red_dot, placeholder: 'City5' }
];

const cities: City[] = [
    { x: 233, y: 139, name: 'City1' },
    { x: 101, y: 198, name: 'City2' },
    { x: 197, y: 240, name: 'City3' },
    { x: 156, y: 78, name: 'City4' },
    { x: 61, y: 102, name: 'City5' }
];

const selectCity = (p: CityPoint) => {
    const copy = { ...p };
    copy.selected = true;
    return copy;
};

const unselectCity = (p: CityPoint) => {
    const copy = { ...p };
    copy.selected = false;
    return copy;
};


const Map: FC<{ cities: City[], getSelectedCity?: (name: string) => void }> = ({ cities, getSelectedCity }) => {

    const [state, setState] = useState<CityPoint[]>(() => {
        return cities.map(city => {
            return { ...city, selected: false }
        });
    });
    const selectedCity = useMemo(() => state.find(c => c.selected === true), [state]);

    useEffect(() => { getSelectedCity && selectedCity && getSelectedCity(selectedCity?.name) }, [state])
    const onPointSelected = (p: CityPoint) => {
        let newState: Array<CityPoint> = prepareNewState(state, p, selectCity);
        for (const mp of state.filter(a => a !== p)) {
            newState = prepareNewState(newState, mp, unselectCity);
        }
        setState(newState);
    }

    const onPointUnselected = (p: CityPoint) => {

    }

    const onPointClicked = (p: CityPoint) => {
        let newState: Array<CityPoint> = prepareNewState(state, p, selectCity);
        for (const mp of state.filter(a => a !== p)) {
            newState = prepareNewState(newState, mp, unselectCity);
        }
        setState(newState);
    }


    return (
        <div >
            <div style={{ position: 'relative' }}>
                <div style={{ display: 'inline-block', position: 'relative' }}>
                    <img src={map} alt="map" />
                    <Points points={state} onPointSelected={onPointSelected} onPointUnselected={onPointUnselected} onPointClicked={onPointClicked} />
                </div>

            </div>

            <Tooltip id="my-tooltip" />
        </div>
    );
}

export const Points: FC<{ points: CityPoint[], onPointSelected: (p: CityPoint) => void, onPointUnselected: (p: CityPoint) => void, onPointClicked: (p: CityPoint) => void }> = ({ points, onPointSelected, onPointUnselected, onPointClicked }) => {

    const elementFactory = (p: CityPoint, i: number) => {
        return <img
            onMouseEnter={() => { console.log('enter'); onPointSelected(p) }}
            onMouseLeave={() => onPointUnselected(p)}
            onClick={() => { console.log('click'); onPointClicked(p) }}
            key={i}
            alt="point"
            style={{ position: 'absolute', left: p.x, top: p.y }} src={p.selected ? green_dot : red_dot} width={20} height={20} />
    }
    const elements = points.map((p, i) => elementFactory(p, i))
    return <>{elements}</>
}

export { Map }

