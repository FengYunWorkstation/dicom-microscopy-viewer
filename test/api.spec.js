const chai = require('chai');
const assert = require('assert');

chai.should();

const metadata = require('./data/metadata.json');

const dicomMicroscopyViewer = require('../build/dicom-microscopy-viewer.js');

describe('dicomMicroscopyViewer.api.VLWholeSlideMicroscopyImageViewer', ()=> {

    let viewer;
    const properties = {};
    const circle = new dicomMicroscopyViewer.scoord3d.Circle([[8.1036, -9.3211, 1], [8.4463, -9.3211, 1]]);
    const point = new dicomMicroscopyViewer.scoord3d.Point([9.0467, -8.7631, 1]);
    const box = new dicomMicroscopyViewer.scoord3d.Polyline([
        [8.8824, -8.8684, 1],
        [9.2255, -9.9634, 1],
        [10.3205, -9.6203, 1],
        [9.9774, -8.5253, 1],
        [8.8824, -8.8684, 1]
    ])
    const polygon = new dicomMicroscopyViewer.scoord3d.Polyline([
        [7.8326, -8.4428, 1],
        [7.1919, -7.9169, 1],
        [8.7772, -7.2831, 1],
        [7.8326, -8.4428, 1]
    ])
    const freehandPolygon = new dicomMicroscopyViewer.scoord3d.Polyline([
        [6.9340, -7.0669, 1],
        [6.9340, -7.0669, 1],
        [6.9189, -7.0216, 1],
        [6.9114, -6.9973, 1],
        [6.9114, -6.9797, 1],
        [6.9139, -6.9621, 1],
        [6.9216, -6.9470, 1],
        [6.9292, -6.9344, 1],
        [6.9419, -6.9294, 1],
        [6.9496, -6.9269, 1],
        [6.9597, -6.9243, 1],
        [6.9674, -6.9243, 1],
        [6.9674, -6.9243, 1],
        [6.9340, -7.0669, 1]
    ])
    const line = new dicomMicroscopyViewer.scoord3d.Polyline([
        [7.0442, -7.5295, 1],
        [7.6725, -7.0580, 1]
    ])
    const freeHandLine = new dicomMicroscopyViewer.scoord3d.Polyline([
        [6.6769, -9.1169, 1],
        [6.6769, -9.1169, 1],
        [6.6668, -9.1119, 1],
        [6.6567, -9.1043, 1],
        [6.6366, -9.0817, 1],
        [6.6182, -9.0423, 1],
        [6.6182, -9.0322, 1],
        [6.6182, -9.0197, 1],
        [6.6233, -9.0096, 1],
        [6.6258, -9.0020, 1],
        [6.6284, -8.9995, 1],
        [6.6334, -8.9945, 1],
        [6.6360, -8.9945, 1]
    ])

    before(() => {
        viewer = new dicomMicroscopyViewer.api.VLWholeSlideMicroscopyImageViewer({
            client: 'foo',
            metadata: metadata,
            useWebGL: false
        });
    })

    it('should return {} if there is no drawing', () => {
        assert.deepEqual(viewer.getROI(0), {});
    })

    it('should create a Circle ROI and return it back successfuly', () => {
        const roi = new dicomMicroscopyViewer.roi.ROI({scoord3d : circle, properties});
        viewer.addROI(roi);
        assert.deepEqual(viewer.getROI(0).scoord3d.graphicData[0], circle.graphicData[0]);
        assert.deepEqual(viewer.getROI(0).scoord3d.graphicData[1], circle.graphicData[1]);
    })

    it('should create a Point ROI and return it back successfuly', () => {
        const roi = new dicomMicroscopyViewer.roi.ROI({scoord3d : point, properties});
        viewer.addROI(roi);
        assert.deepEqual(viewer.getROI(1).scoord3d.graphicData, point.graphicData);
    })
    
    it('should create a Box ROI and return it back successfuly', () => {
        const roi = new dicomMicroscopyViewer.roi.ROI({scoord3d : box, properties});
        viewer.addROI(roi);
        assert.deepEqual(viewer.getROI(2).scoord3d.graphicData, box.graphicData);
    })

    it('should create a Polygon ROI and return it back successfuly', () => {
        const roi = new dicomMicroscopyViewer.roi.ROI({scoord3d : polygon, properties});
        viewer.addROI(roi);
        assert.deepEqual(viewer.getROI(3).scoord3d.graphicData, polygon.graphicData);
    })

    it('should create a Freehand Polygon ROI and return it back successfuly', () => {
        const roi = new dicomMicroscopyViewer.roi.ROI({scoord3d : freehandPolygon, properties});
        viewer.addROI(roi);
        assert.deepEqual(viewer.getROI(4).scoord3d.graphicData, freehandPolygon.graphicData);
    })

    it('should create a Line ROI and return it back successfuly', () => {
        const roi = new dicomMicroscopyViewer.roi.ROI({scoord3d : line, properties});
        viewer.addROI(roi);
        assert.deepEqual(viewer.getROI(5).scoord3d.graphicData, line.graphicData);
    })

    it('should create a FreehandLine ROI and return it back successfuly', () => {
        const roi = new dicomMicroscopyViewer.roi.ROI({scoord3d : freeHandLine, properties});
        viewer.addROI(roi);
        assert.deepEqual(viewer.getROI(6).scoord3d.graphicData, freeHandLine.graphicData);
    })

    it('should return all ROIs created up to now', () => {
        const rois = viewer.getAllROIs();
        assert.equal(rois.length, 7)
    })
    
    it('should be able to remove the circle ROI', () => {
        let rois = viewer.getAllROIs();
        assert.equal(rois.length, 7);
        assert.deepEqual(viewer.getROI(0).scoord3d.graphicData[0], circle.graphicData[0]);
        viewer.removeROI(0);
        rois = viewer.getAllROIs();
        assert.equal(rois.length, 6);
        assert.deepEqual(viewer.getROI(0).scoord3d.graphicData, point.graphicData);
    })

    it('should be able to modify the point ROI', () => {
        let rois = viewer.getAllROIs();
        assert.deepEqual(rois[0].scoord3d.coordinates, point.coordinates);
        const newPoint = new dicomMicroscopyViewer.scoord3d.Point([0, 10, 1]);
        const newPointRoi = new dicomMicroscopyViewer.roi.ROI({scoord3d : newPoint, properties});
        viewer.updateROI(0, newPointRoi);
        rois = viewer.getAllROIs();
        assert.deepEqual(rois[0].scoord3d.coordinates, newPoint.coordinates);
    })

});
