/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import {ColorPalette, HorizontalRule, PanelBody, RangeControl, ToggleControl} from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

import metadata from './block.json';
import { Curve } from './components/curve';

export default function Edit(props) {
	console.log(props);
	const {className, ...blockProps} = useBlockProps();
	return (
		<>
			<section className={`${className} alignfull`} {...blockProps}>
				{props.attributes.enableTopCurve && 
				<Curve 
					height = {props.attributes.topHeight}
					width = {props.attributes.topWidth}
					flipX = {props.attributes.topFlipX}
					flipY = {props.attributes.topFlipY}
				/>}
			</section>
			<InspectorControls>
				<PanelBody title={__("Top curve", metadata.textdomain)}>
					<div style={{display: "flex"}}>
						<ToggleControl 
						onChange={(isChecked)=>{
							props.setAttributes({
								enableTopCurve: isChecked,
							})
						}}
						checked={props.attributes.enableTopCurve}/>
						<span>
							{__('Enable top curve', metadata.textdomain)}
						</span>
					</div>
					{
						props.attributes.enableTopCurve && (
							<>
							 <HorizontalRule/>
							 <RangeControl 
							 label={__('Width', metadata.textdomain)} 
							 min={100} 
							 max={300}
							 value={props.attributes.topWidth || 100}
							 onChange={(newValue) =>{
								props.setAttributes({
									topWidth: parseInt(newValue)
								}); 
							 }}
							 />  
							 <RangeControl 
							 label={__('Height', metadata.textdomain)} 
							 min={0} 
							 max={200}
							 value={props.attributes.topHeight}
							 onChange={(newValue) =>{
								props.setAttributes({
									topHeight: parseInt(newValue)
								}); 
							 }}
							 />
							 <HorizontalRule/>
							<div style={{display: "flex"}}>
								<ToggleControl 
								onChange={(isChecked)=>{
									props.setAttributes({
										topFlipX : isChecked,
									})
								}}
								checked={props.attributes.topFlipX}/>
								<span>
									{__('Flip horizontally', metadata.textdomain)}
								</span>
							</div>  
							<div style={{display: "flex"}}>
								<ToggleControl 
								onChange={(isChecked)=>{
									props.setAttributes({
										topFlipY: isChecked,
									})
								}}
								checked={props.attributes.topFlipY}/>
								<span>
									{__('Flip Vertically', metadata.textdomain)}
								</span>
							</div>  
							<HorizontalRule/>
							<div>
								<label>{__("Curve Color", metadata.textdomain)}</label>
								<ColorPalette 
								value={props.attributes.topColor}
								onChange={(newValue)=>{
									props.setAttributes({
										topColor: newValue,
									})
								}}
								/>
							</div>
							</>
						)
					}
				</PanelBody>
			</InspectorControls>
		</>
	);
}
