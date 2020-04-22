import {Xml} from './xml';

const xml = new Xml();

describe('xml parser', () => {

	it('should return empty array when input is not defined', () => {
		expect(xml.read()).to.eql([]);
	});

	it('should return empty array when passed empty string', () => {
		expect(xml.read('')).to.eql([]);
	});
	it('should return array of one element', () => {
		const text = `<?xml version="1.0" encoding="UTF-8"?>
		<root>
			<row>
				<name>
					<first>Lue</first>
					<last>Laserna</last>
				</name>
			</row>
		</root>`;
		const lines = xml.read(text);
		expect(lines.length).to.equal(1);
	});

	it('should return array of rows', () => {
		const text = `<?xml version="1.0" encoding="UTF-8"?>
		<root>
			<row>
				<name>
					<first>Lue</first>
				</name>
				<contact>
					<phone>310-8268551</phone>
					<phone>310-7618427</phone>
				</contact>
			</row>
			<row>
				<name>
					<first>Jasper</first>
				</name>
				<contact>
					<phone>316-2417120</phone>
					<phone>316-2767391</phone>
				</contact>
			</row>
		</root>`;
		const lines = xml.read(text);
		expect(lines.length).to.equal(2);
		expect(lines[0].name.first).to.equal('Lue');
		expect(lines[1].contact.phone).to.eql(['316-2417120', '316-2767391']);
	});

	it('should create elements from attributes', () => {
		const text = `<?xml version="1.0" encoding="UTF-8"?>
		<root>
			<row jobTitle="manager">
				<contact>
					<email>lue.laserna@nosql-matters.org</email>
					<phone>310-7618427</phone>
				</contact>
				<likes>chatting</likes>
			</row>
			<row likes="wakeboarding">
				<contact email='test@email.com' phone='911'>
					<email>jasper.grebel@nosql-matters.org</email>
					<phone>316-2417120</phone>
					<phone>316-2767391</phone>
				</contact>
				<likes>shopping</likes>
			</row>
		</root>`;

		const lines = xml.read(text);
		expect(lines[0].jobTitle).to.equal('manager');
		expect(lines[1].contact.phone).to.eql(['316-2417120', '316-2767391']);
		expect(lines[1].contact.email).to.eql('jasper.grebel@nosql-matters.org');
		expect(lines[1].likes).to.eql('shopping');
	});
});