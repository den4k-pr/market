import cn from 'clsx'
import { forwardRef } from 'react'

import { IField } from './field.interface'

const Field = forwardRef<HTMLInputElement, IField>(
	(
		{ placeholder, error, className, type = 'text', style, Icon, ...rest },
		ref
	) => {
		return (
			<div className={cn('', className)} style={style}>
				<label className='form-label'>
					<span className='form-label-title'>
						{Icon && <Icon className='' />}
						{placeholder}
					</span>
					<input
						ref={ref}
						type={type}
						placeholder={placeholder}
						className={cn(
							'form-label-input',
							{
								'border-red': !!error
							}
						)}
						{...rest}
					/>
				</label>
				{error && <div className='form-message'>{error}</div>}
			</div>
		)
	}
)

Field.displayName = 'Field'

export default Field
