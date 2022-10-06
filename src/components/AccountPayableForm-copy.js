

          {/* Tipo */}
          <div className='form-control-container'>
            <label htmlFor='idDocumentType' className='' >
              Tipo de documento
            </label>
            <select
              name='idDocumentType'
              id='idDocumentType'
              onChange={handleChange}
              placeholder='Tipo de documento'
              value={values.idDocumentType}>
              {
                documentTypes &&
                documentTypes.map((document) => <option key={document.id} value={document.id}>{document.name}</option>)
              }

            </select>
          </div>
          {
            touched.idDocumentType && errors.idDocumentType && <Message message={errors.idDocumentType} />
          }

          {/* Document Date */}
          <div className='form-control-container' >
            <label htmlFor='documentDate' className='' >
              Fecha
            </label>
            <input
              type='date'
              id='documentDate'
              name='documentDate'
              className='form-control'
              onChange={handleChange}
              value={values.documentDate}
            />
          </div>
          {
            touched.documentDate && errors.documentDate && <Message message={errors.documentDate} />
          }

          {/* Provider */}
          <div className='form-control-container'>
            <label htmlFor='provider' className=''>
              Proveedor
            </label>
            <input
              className=''
              list='providerList'
              id='idProvider'
              type='text'
              name='idProvider'
              value={values.idProvider}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder='Buscar proveedor...'
            />
            <datalist id='providerList'>
              {providers &&
                providers.map((provider) => (
                  <option
                    value={`${provider.id} - ${provider.name}`}
                    key={provider.id}
                  />
                ))}
            </datalist>
          </div>
          {
            touched.idProvider && errors.idProvider && <Message message={errors.idProvider} />
          }

          <div className='form-control-container-four-columns'>
            {/* Exento */}
            <label htmlFor='exento' className=''>
              Exento
            </label>
            <input
              onChange={handleChangeExento}
              value={values.exento}
              type='number'
              id='exento'
              name='exento'
              min='0'
              className='form-control'
            />

            {/* Import */}
            <label htmlFor='importation' className='label-two' >
              Importación
            </label>
            <input
              type='number'
              value={values.importation}
              onChange={handleChangeImportation}
              id='importation'
              name='importation'
              className='form-control'
            />
          </div>

          <div className='form-control-container-four-columns'>
            {/* Service */}
            <label htmlFor='service' className=''>
              Servicio
            </label>
            <input
              value={values.service}
              onChange={handleChangeService}
              type='number'
              id='service'
              name='service'
              className='form-control'
            />

            {/* Assets (bienes) */}
            <label htmlFor='assets' className='label-two'>
              Bienes
            </label>

            <input
              value={values.asset}
              onChange={handleChangeAsset}
              type='number'
              id='asset'
              name='asset'
              className='form-control'
            />
          </div>

          {/* Account */}
          <div className='form-control-container'>
            <label htmlFor='account' className=''>
              Cuenta
            </label>
            <input
              className='form-control'
              list='accountList'
              id='idAccount'
              name='idAccount'
              value={values.idAccount}
              onChange={handleChange}
              onBlur={handleBlur}
              type='text'
              placeholder='Seleccionar cuenta...'
            />
            <datalist id='accountList'>
              {accounts &&
                accounts.map((account) => (
                  <option
                    key={account.id}
                    value={`${account.accountNumber} - ${account.name}`}
                  />
                ))}
            </datalist>
          </div>
          {
            touched.idAccount && errors.idAccount && <Message message={errors.idAccount} />
          }

          {/* Sub-total */}
          <div className='form-control-container'>
            <label htmlFor='sub_total' className=''>
              Sub-total
            </label>
            <input
              type='text'
              readOnly
              id='subtotal'
              name='subtotal'
              onChange={handleChange}
              className='form-control'
              disabled
            />
          </div>
          {
            touched.subtotal && errors.subtotal && <Message message={errors.subtotal} />
          }

          {/* IVA */}
          <div className='form-control-container'>
            <label htmlFor='iva' className=''>
              IVA
            </label>
            <input
              type='text'
              readOnly
              id='iva'
              name='iva'
              className='form-control'
              onChange={handleChange}
            />
          </div>
          {
            touched.iva && errors.iva && <Message message={errors.iva} />
          }

          {/* TOTAL */}
          <div className='form-control-container'>
            <label htmlFor='total' className='col-sm-2 form-label'>
              Total
            </label>
            <input
              type='text'
              readOnly
              id='total'
              name='total'
              className='form-control'
              onChange={handleChange}
            />
          </div>
          {
            touched.total && errors.total && <Message message={errors.total} />
          }

          {/* Message */}
          {message && (
            <div
              className={`message ${message.error ? 'message-error' : 'message-success'
                }`}
            >
              {message.message}
            </div>
          )}

          <div className='form-actions'>
            <button type='submit' className='btn-save'>
              Guardar
            </button>
            <button
              type='button'
              className='btn-cancel'
              onClick={(e) => handleCancel(e)}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div >
  )
}

export default AccountPayableForm
