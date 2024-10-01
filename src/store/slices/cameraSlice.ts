import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CameraState {
	position: [number, number, number];
	rotation: [number, number, number];
	zoom: number;
}

const initialState: CameraState = {
	position: [0, 0, 0],
	rotation: [0, 0, 0],
	zoom: 1,
};

export const cameraSlice = createSlice({
	name: 'camera',
	initialState,
	reducers: {
		setPosition: (state, action: PayloadAction<[number, number, number]>) => {
			state.position = action.payload;
		},
		setRotation: (state, action: PayloadAction<[number, number, number]>) => {
			state.rotation = action.payload;
		},
		setZoom: (state, action: PayloadAction<number>) => {
			state.zoom = action.payload;
		},
	},
});

export const { setPosition, setRotation, setZoom } = cameraSlice.actions;
export default cameraSlice.reducer;
