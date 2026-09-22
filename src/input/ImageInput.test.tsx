import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ImageInput} from './ImageInput';

describe('ImageInput', () => {
    it('renders the label and associates it with the file input', () => {
        render(<ImageInput name="file" label="upload image" setFiles={() => {}}/>);

        const input = screen.getByLabelText('upload image', {exact: false});
        expect(input).toHaveAttribute('type', 'file');
        expect(input).toHaveAttribute('accept', 'image/*');
    });

    it('appends the required asterisk to the label when required', () => {
        render(<ImageInput name="file" label="upload image" required setFiles={() => {}}/>);

        expect(screen.getByText('upload image', {exact: false}).textContent).toBe(' upload image *');
    });

    it('displays the error message when error is provided', () => {
        render(<ImageInput name="file" label="upload image" error="Image is required" setFiles={() => {}}/>);

        expect(screen.getByText('Image is required')).toBeInTheDocument();
    });

    it('passes a single File to setFiles when multiple is false', async () => {
        const user = userEvent.setup();
        const setFiles = vi.fn();
        render(<ImageInput name="single-file" label="upload one image" multiple={false} setFiles={setFiles}/>);

        const file = new File(['img'], 'photo.png', {type: 'image/png'});
        const input = screen.getByLabelText('upload one image', {exact: false});
        await user.upload(input, file);

        expect(setFiles).toHaveBeenCalledTimes(1);
        expect(setFiles).toHaveBeenCalledWith([file]);
        expect(screen.getByText('photo.png')).toBeInTheDocument();
    });

    it('passes all selected files to setFiles when multiple is true and under the max', async () => {
        const user = userEvent.setup();
        const setFiles = vi.fn();
        render(<ImageInput name="files" label="upload images" multiple setFiles={setFiles}/>);

        const file1 = new File(['a'], 'a.png', {type: 'image/png'});
        const file2 = new File(['b'], 'b.png', {type: 'image/png'});
        const input = screen.getByLabelText('upload images', {exact: false});
        await user.upload(input, [file1, file2]);

        expect(setFiles).toHaveBeenCalledWith([file1, file2]);
        expect(screen.getByText('a.png, b.png')).toBeInTheDocument();
    });

    it('truncates to maxFiles and shows a warning when too many files are selected', async () => {
        const user = userEvent.setup();
        const setFiles = vi.fn();
        render(<ImageInput name="files" label="upload images" multiple maxFiles={1} setFiles={setFiles}/>);

        const file1 = new File(['a'], 'a.png', {type: 'image/png'});
        const file2 = new File(['b'], 'b.png', {type: 'image/png'});
        const input = screen.getByLabelText('upload images', {exact: false});
        await user.upload(input, [file1, file2]);

        expect(setFiles).toHaveBeenCalledWith([file1]);
        expect(screen.getByText('Only first 1 files included')).toBeInTheDocument();
    });
});
