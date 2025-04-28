import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CONSTANTS } from 'shared/constants';

describe('ApiService', () => {
	let service: ApiService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
			providers: [ApiService],
		});

		service = TestBed.inject(ApiService);
		httpMock = TestBed.inject(HttpTestingController);

		// Set a mock token in localStorage
		localStorage.setItem('accessToken', 'mock-token');
	});

	afterEach(() => {
		httpMock.verify(); // Ensure no outstanding requests
		localStorage.clear();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should make GET request with token', () => {
		const mockData = { message: 'Success' };

		service.get('test-endpoint').subscribe((res) => {
			expect(res).toEqual(mockData);
		});

		const req = httpMock.expectOne(`${CONSTANTS.BASE_URL}/test-endpoint`);
		expect(req.request.method).toBe('GET');
		expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');

		req.flush(mockData);
	});

	it('should make POST request with auth by default', () => {
		const payload = { key: 'value' };
		const response = { message: 'Posted' };

		service.post('post-endpoint', payload).subscribe((res) => {
			expect(res).toEqual(response);
		});

		const req = httpMock.expectOne(`${CONSTANTS.BASE_URL}/post-endpoint`);
		expect(req.request.method).toBe('POST');
		expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');

		req.flush(response);
	});

	it('should make POST request without auth if disabled', () => {
		const payload = { test: true };

		service.post('unauth-post', payload, false).subscribe();

		const req = httpMock.expectOne(`${CONSTANTS.BASE_URL}/unauth-post`);
		expect(req.request.headers.has('Authorization')).toBeFalse();

		req.flush({});
	});

	it('should make PUT request with token', () => {
		const update = { id: 1, title: 'Updated' };

		service.put('put-endpoint', update).subscribe();

		const req = httpMock.expectOne(`${CONSTANTS.BASE_URL}/put-endpoint`);
		expect(req.request.method).toBe('PUT');
		expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');

		req.flush({});
	});

	it('should make DELETE request with body', () => {
		const body = { id: 1 };

		service.delete('delete-endpoint', body).subscribe();

		const req = httpMock.expectOne(`${CONSTANTS.BASE_URL}/delete-endpoint`);
		expect(req.request.method).toBe('DELETE');
		expect(req.request.body).toEqual(body);
		expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');

		req.flush({});
	});

	it('should make PATCH request with token', () => {
		const patchData = { title: 'patched' };

		service.patch('patch-endpoint', patchData).subscribe();

		const req = httpMock.expectOne(`${CONSTANTS.BASE_URL}/patch-endpoint`);
		expect(req.request.method).toBe('PATCH');
		expect(req.request.headers.get('Authorization')).toBe('Bearer mock-token');

		req.flush({});
	});
});
