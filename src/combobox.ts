import type { IdItem } from "./components/ListBoxItem.svelte";
import ComboBox from "./components/ComboBox.svelte";

for (const select of document.querySelectorAll<HTMLSelectElement>(
    ".svelte-combobox"
)) {
    const idItems: IdItem[] = Array.from(select.options)
        .filter((option) => option.label)
        .map((option, index) => ({
            id: index,
            label: option.text,
            value: option.value,
        }));

    const selectedItem = idItems.find((item) => item.value === select.value);

    new ComboBox({
        target: select.parentElement as HTMLElement,
        anchor: select,
        props: {
            id: select.id,
            name: select.name,
            search: selectedItem?.label,
            selectedItem,
            idItems,
            hiddenInput: true,
        },
    });

    select.remove();
}
