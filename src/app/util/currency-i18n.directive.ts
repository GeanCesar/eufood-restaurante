import { Directive } from "@angular/core";
import { NgControl, NgModel } from "@angular/forms";
import { CurrencyPipe, DecimalPipe } from "@angular/common";

@Directive({
  selector: "[appCurrencyI18n]",
  providers: [NgModel, CurrencyPipe, DecimalPipe],
  host: {
    "(focus)": "onInputChange($event)",
    "(blur)": "onInputChange($event)"
  }
})
export class CurrencyI18nDirective {
  constructor(
    private currencyPipe: CurrencyPipe,
    public ngControl ? : NgControl
  ) {}

  onInputChange($event : any, valorDireto ? : boolean) : string {
    var value;
    if(valorDireto) {
      value = "" + $event;
    } else {
      value = $event.target.value;
    }

    if (!value) return "";

    var plainNumber: number;
    var formattedValue : string | null;

    var decimalSeparatorIndex = value.lastIndexOf(",");
    if(decimalSeparatorIndex < 0) {
      decimalSeparatorIndex =  value.lastIndexOf(".");
    }
    if (decimalSeparatorIndex > 0) {
      // if input has decimal part
      var wholeNumberPart = value.substring(0, decimalSeparatorIndex);
      var decimalPart = value.substr(decimalSeparatorIndex + 1);
      plainNumber = parseFloat(
        wholeNumberPart.replace(/[^\d]/g, "") + "." + decimalPart
      );
    } else {
      // input does not have decimal part
      plainNumber = parseFloat(value.replace(/[^\d]/g, ""));
    }

    if (!plainNumber) {
      formattedValue = "";
    } else {
      formattedValue = this.currencyPipe.transform(
        plainNumber.toFixed(2),
        "BRL",
        "symbol"
      );
    }

    if(this.ngControl) {
      if(this.ngControl.valueAccessor)
        this.ngControl.valueAccessor.writeValue(formattedValue);
    }    

    if(formattedValue)
      return formattedValue;

    return "";
  }
}
