import { getFactory as valueFactory } from '../services/value';
import { getFactory as labelFactory } from '../services/label';

export function editCellContextFactory(cell, newValue, newLabel, tag) {
    const {
        column,
        row,
        columnIndex,
        rowIndex,
        value: oldValue,
        label: oldLabel
    } = cell;
    
    return {
        column,
        row,
        columnIndex,
        rowIndex,

        oldValue,
        newValue,
        
        oldLabel,
        newLabel,
                
        valueFactory,
        labelFactory,

        unit: 'cell',
        tag,
    };
}
