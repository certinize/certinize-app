import React, {  } from "react";
import "./Transfer.css";
import 'bootstrap/dist/css/bootstrap.min.css';
const TransferFile = () => {
	return (
        <div className="body">
            <div className="title">
                <p>Distribute Certificate </p>
            </div>
            <hr/>
            <div className="user-display">
                <form>
                    <div className="field-set">
                        <div className="form-row">
                            <label>Last Name: </label>
                            <input className="text-inp" type="text" name="" value="" />
                            <label>First Name: </label>
                            <input className="text-inp" type="text" name="" value="" />
                            <label>MI: </label>
                            <input className="MI" type="text" name="" value="" />
                            <label>Suffix: </label>
                            <input className="MI" type="text" name="" value="" />
                        </div>
                        <div className="col">
                            <label>Blockchain Address: </label>
                            <input className="bc"  type="text" name="" value="" />
                            
                        </div>
                    </div>
                    <div className="button">
                        <input className="submit"  type="submit" name="" value="Add Recipient" />
                    </div>
                
                </form>

                <div className="user-table">
                    <table className="table table-borderless table-hover table-responsive">
                        <thead>
                            <tr>
                                <th><p>#</p></th>
                                <th><p>Last Name</p></th>
                                <th><p>First Name</p></th>
                                <th><p>MI</p></th>
                                <th><p>Suffix</p></th>
                                <th><p>Blockchain Address</p></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>Dela Cruz</td>
                                <td>Juan</td>
                                <td>A</td>
                                <td>Jr.</td>
                                <td>B7KNk9UWUGjg89NrmuCvuzNc9dNrmQYCQtcQB525a8HU</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>Manrique</td>
                                <td>Franz Ronin</td>
                                <td>M</td>
                                <td></td>
                                <td>B7KNk9UWUGjg89NrmuCvuzNc9dNrmQYCQtcQB525a8HU</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>Zaracena</td>
                                <td>Mindy Kay</td>
                                <td>V</td>
                                <td></td>
                                <td>B7KNk9UWUGjg89NrmuCvuzNc9dNrmQYCQtcQB525a8HU</td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>Flores</td>
                                <td>Hju Kneyck</td>
                                <td>M</td>
                                <td></td>
                                <td>B7KNk9UWUGjg89NrmuCvuzNc9dNrmQYCQtcQB525a8HU</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>Tan</td>
                                <td>Jose</td>
                                <td>R</td>
                                <td>Jr.</td>
                                <td>B7KNk9UWUGjg89NrmuCvuzNc9dNrmQYCQtcQB525a8HU</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <br/>

        </div>
	);
};

export default TransferFile;
