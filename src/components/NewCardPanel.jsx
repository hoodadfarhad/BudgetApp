import React from "react";

function NewCardPanel(prop) {
  return (
    <div className="newCardInput">
      <form className="form-width">
        <div className="mb-3">
          <label for="exampleFormControlInput1" className="form-label">
            Account Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Example: Saving"
          />

          <label for="exampleFormControlInput1" className="form-label">
            Bank Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Example: TD"
          />

          <label for="exampleFormControlInput1" className="form-label">
            Balance:
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleFormControlInput1"
            placeholder="Example: 1000.00"
          />
        </div>
        <div class="col-auto">
          <button type="submit" class="btn btn-primary mb-3">
            Add Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewCardPanel;
