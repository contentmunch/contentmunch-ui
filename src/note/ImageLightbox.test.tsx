import {describe, expect, it, vi} from 'vitest';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {ImageLightbox} from './ImageLightbox';
import type {LightboxState} from './useMediaImageLightbox';

describe('ImageLightbox', () => {
    it('renders nothing content-wise when state is null', () => {
        render(<ImageLightbox state={null} show={false} onClose={vi.fn()}/>);
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
        expect(screen.getByRole('button', {name: 'Close'})).toBeInTheDocument();
    });

    it('renders an image with alt text when state is an image', () => {
        const state: LightboxState = {type: 'image', src: 'https://example.com/photo.jpg', alt: 'A photo'};
        render(<ImageLightbox state={state} show={true} onClose={vi.fn()}/>);

        const img = screen.getByRole('img', {name: 'A photo'});
        expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg');
    });

    it('renders the caption when the image state carries one', () => {
        const state: LightboxState = {type: 'image', src: 'https://example.com/photo.jpg', alt: 'A photo', caption: 'A caption'};
        render(<ImageLightbox state={state} show={true} onClose={vi.fn()}/>);

        expect(screen.getByText('A caption')).toBeInTheDocument();
    });

    it('does not render a caption element when the image state has none', () => {
        const state: LightboxState = {type: 'image', src: 'https://example.com/photo.jpg', alt: 'A photo'};
        const {container} = render(<ImageLightbox state={state} show={true} onClose={vi.fn()}/>);

        expect(container.querySelector('.image-lightbox-caption')).toBeNull();
    });

    it('renders the diagram svg markup when state is a diagram', () => {
        const state: LightboxState = {type: 'diagram', svg: '<svg id="mermaid-1"><rect/></svg>'};
        const {container} = render(<ImageLightbox state={state} show={true} onClose={vi.fn()}/>);

        expect(container.querySelector('.image-lightbox-diagram svg#mermaid-1')).not.toBeNull();
        expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('calls onClose when the close button is clicked', async () => {
        const user = userEvent.setup();
        const onClose = vi.fn();
        render(<ImageLightbox state={null} show={true} onClose={onClose}/>);

        await user.click(screen.getByRole('button', {name: 'Close'}));

        expect(onClose).toHaveBeenCalledTimes(1);
    });
});
