export default function shortenVersion(v: string) {
    return v.replace(/[^\d]+/g, '');
}