import { CurrencyPipe } from "@angular/common";
import { Pipe, PipeTransform } from "@angular/core";
import localePt from '@angular/common/locales/pt';

@Pipe({ 
    name: 'moneyFormat',
 })
export class MoneyPipe implements PipeTransform{

    transform(value: any): string {
        return this.formata(value.toString());
    }

    formata(value : string){
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
                const currencyPipe = new CurrencyPipe("pt-BR");
                
                formattedValue = currencyPipe.transform(
                    plainNumber.toFixed(2),
                    "BRL",
                    "symbol"
            );
        }

        if(formattedValue)
            return formattedValue;

        return "";
    }

}