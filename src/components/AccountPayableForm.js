import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Field } from "formik";
import { GET_ALL_DOCUMENT_TYPES } from "../graphql/DocumentType/queries";
import { GET_ALL_PROVIDERS } from "../graphql/Provider/queries";
import { GET_ALL_ACCOUNTS } from "../graphql/Account/queries";
import {
  CREATE_ACCOUNT_PAYABLE,
  UPDATE_ACCOUNT_PAYABLE,
} from "../graphql/AccountsPayable/muations";
import {
  GET_ACCOUNT_PAYABLE_BY_ID,
  GET_ALL_ACCOUNTS_PAYABLE,
} from "../graphql/AccountsPayable/queries";

const AccountPayableForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data: docs } = useQuery(GET_ALL_DOCUMENT_TYPES);
  const { data: providersData } = useQuery(GET_ALL_PROVIDERS);
  const { data: accountsData } = useQuery(GET_ALL_ACCOUNTS);
  const [getAccountPayableById, { data: accountPayableById }] = useLazyQuery(
    GET_ACCOUNT_PAYABLE_BY_ID
  );
  const [message, setMessage] = useState(null);
  const [createAccountPayable] = useMutation(CREATE_ACCOUNT_PAYABLE);
  const [updateAccountPayable] = useMutation(UPDATE_ACCOUNT_PAYABLE);
  const [documentTypes, setDocumentTypes] = useState([]);
  const [providers, setProviders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [accountPayableInitialValues, setAccountPayableInitialValues] =
    useState({
      id: 0,
      idDocumentType: "",
      idProvider: "",
      idAccount: "",
      serie: "",
      documentNumber: "",
      documentDate: "",
      exento: 0,
      importation: 0,
      service: 0,
      asset: 0,
      subtotal: 0,
      iva: 0,
      total: 0,
    });

  useEffect(() => {
    if (params.id) {
      setIsEditing(true);
      getAccountPayableById({ variables: { id: params.id } });
    }
  }, []);

  useEffect(() => {
    setAccountPayableInitialValues({
      ...accountPayableInitialValues,
      total:
        parseFloat(accountPayableInitialValues.exento) +
        parseFloat(accountPayableInitialValues.importation) +
        parseFloat(accountPayableInitialValues.service) +
        parseFloat(accountPayableInitialValues.asset),
    });
  }, [
    accountPayableInitialValues.exento,
    accountPayableInitialValues.importation,
    accountPayableInitialValues.service,
    accountPayableInitialValues.asset,
  ]);

  useEffect(() => {
    setAccountPayableInitialValues({
      ...accountPayableInitialValues,
      iva: accountPayableInitialValues.total * 0.12,
    });
  }, [accountPayableInitialValues.total]);

  useEffect(() => {
    setAccountPayableInitialValues({
      ...accountPayableInitialValues,
      subtotal:
        accountPayableInitialValues.total - accountPayableInitialValues.iva,
    });
  }, [accountPayableInitialValues.iva]);

  const handleChangeService = ({ target }) => {
    setAccountPayableInitialValues({
      ...accountPayableInitialValues,
      service: parseFloat(target.value) || 0,
    });
  };

  const handleChangeAsset = ({ target }) => {
    setAccountPayableInitialValues({
      ...accountPayableInitialValues,
      asset: parseFloat(target.value) || 0,
    });
  };

  const handleChangeExento = ({ target }) => {
    setAccountPayableInitialValues((prevState) => {
      return {
        ...accountPayableInitialValues,
        exento: parseFloat(target.value) || 0,
      };
    });
  };

  const handleChangeImportation = ({ target }) => {
    setAccountPayableInitialValues((prevState) => {
      return {
        ...accountPayableInitialValues,
        importation: parseFloat(target.value) || 0,
      };
    });
  };

  useEffect(() => {
    if (accountPayableById) {
      const documentDate = new Date(
        accountPayableById.getAccountPayableById.documentDate
      );
      setAccountPayableInitialValues({
        id: accountPayableById.getAccountPayableById.id,
        idDocumentType:
          accountPayableById.getAccountPayableById.documentType.id,
        idProvider: `${accountPayableById.getAccountPayableById.proveedor.id} - ${accountPayableById.getAccountPayableById.proveedor.name}`,
        idAccount: `${accountPayableById.getAccountPayableById.account.accountNumber} - ${accountPayableById.getAccountPayableById.account.name}`,
        serie: accountPayableById.getAccountPayableById.serie,
        documentNumber: accountPayableById.getAccountPayableById.documentNumber,
        documentDate: `${documentDate.getFullYear()}-${String(
          documentDate.getMonth() + 1
        ).padStart(2, 0)}-${String(documentDate.getDate()).padStart(2, 0)}`,
        exento: accountPayableById.getAccountPayableById.exento,
        importation: accountPayableById.getAccountPayableById.importation,
        service: accountPayableById.getAccountPayableById.service,
        asset: accountPayableById.getAccountPayableById.asset,
        subtotal: accountPayableById.getAccountPayableById.subtotal,
        iva: accountPayableById.getAccountPayableById.iva,
        total: accountPayableById.getAccountPayableById.total,
      });
    }
  }, [accountPayableById]);

  useEffect(() => {
    if (docs) setDocumentTypes(docs.getAllDocumentTypes);
    if (providersData) setProviders(providersData.getAllProviders);
    if (accountsData) setAccounts(accountsData.getAllAccounts);
  }, [docs, providersData, accountsData]);

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  const validateFields = (values) => {
    try {
      let errors = {};
      if (!values.serie) errors.serie = "La serie es requerida.";

      if (!values.documentNumber)
        errors.documentNumber = "El número de documento es requerido.";

      // if (!values.documentType)
      //   errors.documentType = "El tipo de documento es requerido.";

      // if (!values.documentDate)
      //   errors.documentDate = "La fecha del documento es requerida.";

      return errors;
    } catch (error) {
      console.log(error);
    }
  };

  const getIdAccount = (accountNumber) => {
    const account = accounts.filter(
      (account) => account.accountNumber === accountNumber
    );
    return account[0].id;
  };

  const handleCreateAccountPayable = async (values, { resetForm }) => {
    try {
      if (isEditing) {
        //EDIT
        await updateAccountPayable({
          variables: {
            accountPayable: {
              id: values.id,
              idDocumentType: values.idDocumentType,
              idProvider: values.idProvider.split("-")[0].trim(),
              idAccount: getIdAccount(values.idAccount.split("-")[0].trim()),
              serie: values.serie,
              documentNumber: values.documentNumber,
              documentDate: values.documentDate,
              exento: values.exento.toString(),
              importation: values.importation.toString(),
              service: values.service.toString(),
              asset: values.asset.toString(),
              subtotal: values.subtotal.toString(),
              iva: values.iva.toString(),
              total: values.total.toString(),
            },
          },
          refetchQueries: [{ query: GET_ALL_ACCOUNTS_PAYABLE }],
        });
      } else {
        //ADD
        await createAccountPayable({
          variables: {
            accountPayable: {
              id: 0,
              idDocumentType: values.idDocumentType,
              idProvider: values.idProvider.split("-")[0].trim(),
              idAccount: getIdAccount(values.idAccount.split("-")[0].trim()),
              serie: values.serie,
              documentNumber: values.documentNumber,
              documentDate: values.documentDate,
              exento: values.exento.toString(),
              importation: values.importation.toString(),
              service: values.service.toString(),
              asset: values.asset.toString(),
              subtotal: values.subtotal.toString(),
              iva: values.iva.toString(),
              total: values.total.toString(),
            },
          },
          refetchQueries: [{ query: GET_ALL_ACCOUNTS_PAYABLE }],
        });
      }

      setMessage({
        error: false,
        message: `Cuenta por pagar ${
          isEditing ? "actualizada" : "creada"
        } correctamente`,
      });
      setTimeout(() => {
        setMessage(null);
        navigate(-1);
        resetForm();
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="col-sm-12">
      <div className="card">
        <div className="card-header">
          <button onClick={handleCancel} className="btn">
            <i className="fas fa-arrow-left"></i>
          </button>
          {isEditing ? "Editar" : "Agregar"} cuenta por pagar
        </div>
        <div className="card-body">
          <Formik
            enableReinitialize
            initialValues={accountPayableInitialValues}
            validate={validateFields}
            onSubmit={handleCreateAccountPayable}>
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                {/* Serie */}
                <div className="input-group mb-3">
                  <label htmlFor="serie" className="col-sm-2 form-label">
                    Serie
                  </label>
                  <div className="col-sm-4">
                    <Field
                      id="serie"
                      type="text"
                      name="serie"
                      className="form-control"
                      placeholder="Serie"
                    />
                  </div>
                  {/* Document Number */}

                  <label htmlFor="serie" className="mx-2 col-sm-1 form-label">
                    Número
                  </label>

                  <Field
                    id="documentNumber"
                    name="documentNumber"
                    type="text"
                    placeholder="Número del documento"
                    className="form-control"
                  />
                </div>

                {(touched.serie && errors.serie) ||
                (touched.documentNumber && errors.documentNumber) ? (
                  <div className="container ">
                    <div className="row">
                      <div className="col-6">
                        {touched.serie && errors.serie && (
                          <div className="error" style={{ color: "red" }}>
                            {errors.serie}
                          </div>
                        )}
                      </div>

                      <div className="col-6">
                        {touched.documentNumber && errors.documentNumber && (
                          <div className="error" style={{ color: "red" }}>
                            {errors.documentNumber}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ) : null}

                <div className="input-group mb-3">
                  {/* Tipo */}
                  <label
                    htmlFor="type_document"
                    className="col-sm-2 form-label">
                    Tipo de documento
                  </label>
                  <div className="col-sm-4">
                    <Field
                      component="select"
                      name="idDocumentType"
                      className="form-control">
                      {documentTypes &&
                        documentTypes.map((document) => (
                          <option key={document.id} value={document.id}>
                            {document.name}
                          </option>
                        ))}
                    </Field>
                  </div>

                  {/* Document Date */}
                  <label
                    htmlFor="document_date"
                    className="mx-2 col-sm-1 form-label">
                    Fecha
                  </label>
                  <Field
                    type="date"
                    id="documentDate"
                    name="documentDate"
                    className="form-control"
                  />
                </div>
                {/* Provider */}
                <div className="mb-3 row">
                  <label htmlFor="provider" className="col-sm-2 form-label">
                    Proveedor
                  </label>
                  <div className="col-sm-10">
                    <input
                      className="form-control"
                      list="providerList"
                      id="idProvider"
                      type="text"
                      name="idProvider"
                      value={values.idProvider}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Buscar proveedor..."
                    />
                    <datalist id="providerList">
                      {providers &&
                        providers.map((provider) => (
                          <option
                            value={`${provider.id} - ${provider.name}`}
                            key={provider.id}></option>
                        ))}
                    </datalist>
                  </div>
                </div>

                <div className="input-group mb-3">
                  {/* Exento */}
                  <label htmlFor="exento" className="col-sm-2 form-label">
                    Exento
                  </label>
                  <div className="col-sm-4">
                    <input
                      onChange={handleChangeExento}
                      value={values.exento}
                      type="number"
                      id="exento"
                      name="exento"
                      min="0"
                      className="form-control"
                    />
                  </div>
                  {/* Import */}

                  <label
                    htmlFor="importation"
                    className="mx-2 col-sm-1 form-label">
                    Importación
                  </label>
                  <input
                    type="number"
                    value={values.importation}
                    onChange={handleChangeImportation}
                    id="importation"
                    name="importation"
                    className="form-control"
                  />
                </div>

                <div className="input-group mb-3">
                  {/* Service */}
                  <label htmlFor="service" className="col-sm-2 form-label">
                    Servicio
                  </label>
                  <div className="col-sm-4">
                    <input
                      value={values.service}
                      onChange={handleChangeService}
                      type="number"
                      id="service"
                      name="service"
                      className="form-control"
                    />
                  </div>

                  {/* Assets (bienes) */}

                  <label htmlFor="assets" className="mx-2 col-sm-1 form-label">
                    Bienes
                  </label>

                  <input
                    value={values.asset}
                    onChange={handleChangeAsset}
                    type="number"
                    id="asset"
                    name="asset"
                    className="form-control"
                  />
                </div>

                {/* Account */}
                <div className="mb-3 row">
                  <label htmlFor="account" className="col-sm-2 form-label">
                    Cuenta
                  </label>
                  <div className="col-sm-10">
                    <Field
                      className="form-control"
                      list="accountList"
                      id="idAccount"
                      name="idAccount"
                      value={values.idAccount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                      placeholder="Seleccionar cuenta..."
                    />
                    <datalist id="accountList">
                      {accounts &&
                        accounts.map((account) => (
                          <option
                            key={account.id}
                            value={`${account.accountNumber} - ${account.name}`}
                          />
                        ))}
                    </datalist>
                  </div>
                </div>

                {/* Sub-total */}
                <div className="mb-3 row">
                  <label htmlFor="sub_total" className="col-sm-2 form-label">
                    Sub-total
                  </label>
                  <div className="col-sm-10">
                    <Field
                      type="text"
                      readOnly
                      id="subtotal"
                      name="subtotal"
                      className="form-control"
                    />
                  </div>
                </div>

                {/* IVA */}
                <div className="mb-3 row">
                  <label htmlFor="iva" className="col-sm-2 form-label">
                    IVA
                  </label>
                  <div className="col-sm-10">
                    <Field
                      type="text"
                      readOnly
                      id="iva"
                      name="iva"
                      className="form-control"
                    />
                  </div>
                </div>

                {/* TOTAL */}
                <div className="mb-3 row">
                  <label htmlFor="total" className="col-sm-2 form-label">
                    Total
                  </label>
                  <div className="col-sm-10">
                    <Field
                      type="text"
                      readOnly
                      id="total"
                      name="total"
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Message */}
                {message && (
                  <div
                    className={`message ${
                      message.error ? "message-error" : "message-success"
                    }`}>
                    {message.message}
                  </div>
                )}

                <>
                  <button type="submit" className="btn btn-primary">
                    Guardar
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={(e) => handleCancel(e)}>
                    Cancelar
                  </button>
                </>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AccountPayableForm;
